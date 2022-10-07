import { Binding, Credentials } from "./api/api"
import { connect, getDeviceStatusMessage, TemialMessage } from "./api/socket"

export const connectToTemial = async ( { accessToken }: Credentials, { userId, deviceId }: Binding, messageHandler: (message?: TemialMessage) => void) => {
  const options = {
    userId,
    deviceId,
    accessToken,
  }

  await connect(options, (socket) => {
    messageHandler()
    socket.send(getDeviceStatusMessage())
  }, messageHandler)
}