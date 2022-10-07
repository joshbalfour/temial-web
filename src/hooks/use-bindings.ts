import { useEffect, useState } from "react"
import { Binding, Credentials, getBindings, TMError } from "../temial/src"

export const useBindings = (credentials?: Credentials) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<TMError>()
  const [bindings, setBindings] = useState<Binding[]>([])
  const [selectedBinding, setSelectedBinding] = useState<Binding>()

  useEffect(() => {
    if (credentials) {
      setLoading(true)
      getBindings(credentials)
        .then(bindings => {
          setBindings(bindings)
          if (bindings.length > 0) {
            setSelectedBinding(bindings[0])
          }
        })
        .catch(setError)
        .finally(() => setLoading(false))
    }
  } , [credentials])

  return {
    loading,
    error,
    bindings,
    selectedBinding,
    setSelectedBinding,
  }
}