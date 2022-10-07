import { useState } from "react"
import { Button } from "../components/button"
import { Loading } from "../components/loading"
import { Credentials, login, TMError } from "../temial/src"

export const Login = ({ onCredentials }: { onCredentials: (credentials: Credentials) => void }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const credentials = await login({ loginName: username, password })
      onCredentials(credentials)
    } catch (e: any) {
      if (e instanceof TMError) {
        setError(e.message)
      } else {
        setError('Unknown error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" value={username} onChange={e => {
        setUsername(e.target.value)
      }} />
      <input type="password" placeholder="password" value={password} onChange={e => {
        setPassword(e.target.value)
      }} />
      <Button type="submit" disabled={loading}>Login</Button>
      {error && <div>{error}</div>}
      {loading && <Loading />}
    </form>
  )
}