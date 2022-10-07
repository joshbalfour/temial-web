import { Home } from './views/home'
import { Login } from './views/login'
import { useSavedCredentials } from './hooks/use-saved-credentials'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const App = () => {
  const { credentials, setCredentials } = useSavedCredentials()
  
  return (
    <Container>
      {credentials ? (
        <Home credentials={credentials} clearCredentials={() => setCredentials(undefined)} />
      ) : (
        <Login onCredentials={setCredentials} />
      )}
    </Container>
  )
}