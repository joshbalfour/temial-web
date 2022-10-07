import { useState, useEffect } from "react"
import { Binding, BrewingCompleteContent, BrewStatusContent, connectToTemial, Credentials, OpType, StatusMessageContent, TemialMessage } from "../temial/src"

export const useTemial = (credentials?: Credentials, binding?: Binding) => {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [status, setStatus] = useState<StatusMessageContent>()
  const [brewStatus, setBrewStatus] = useState<BrewStatusContent>()
  const [brewComplete, setBrewComplete] = useState<BrewingCompleteContent>()

  useEffect(() => {
    if (credentials && binding) {
      setConnecting(true)
      connectToTemial(credentials, binding, (message?: TemialMessage) => {
        if (!message) {
          setConnecting(false)
          setConnected(true)
        }
        switch (message?.op) {
          case OpType.DEVICE_STATUS:
            return setStatus(message.content)
          case OpType.BREW_STATUS:
            return setBrewStatus(message.content)
          case OpType.BREWING_COMPLETE:
            setBrewStatus(undefined)
            return setBrewComplete(message.content)
        }
      })
    }
  }, [credentials, binding])

  return {
    connecting,
    connected,
    status,
    brewStatus,
    brewComplete,
  }
}