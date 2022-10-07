import { Credentials } from "../temial/src"

import { useBindings } from "../hooks/use-bindings"
import { useTemial } from "../hooks/use-temial"
import { Bindings } from "../components/bindings"
import { BrewComplete } from "../components/brew-complete"
import { BrewStatus } from "../components/brew-status"
import { DeviceStatus } from "../components/device-status"
import styled from "styled-components"
import { Logo } from "../components/logo"
import { Loading } from "../components/loading"
import { Button } from "../components/button"

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(247,247,247,.9);;
  flex: 1;
`

const StyledLogo = styled(Logo)`
  width: 69px;
  height: 19px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const Home = ({ credentials, clearCredentials }: { credentials: Credentials, clearCredentials: () => void }) => {
  const { loading, bindings, error, selectedBinding, setSelectedBinding } = useBindings(credentials)
  const { connecting, status, brewStatus, brewComplete } = useTemial(credentials, selectedBinding)

  return (
    <>
      <Navbar>
        <StyledLogo />
        <Button onClick={clearCredentials}>Logout</Button>
      </Navbar>
      <Content>
        {loading && <Loading />}
        {error && <div>Error loading your machines: {error.message}</div>}
        {!selectedBinding && <Bindings bindings={bindings} setBinding={setSelectedBinding} binding={selectedBinding} />}
        {selectedBinding && (
          <>
            {connecting && <Loading />}
            {bindings.length > 1 && <Button onClick={() => setSelectedBinding(undefined)}>Change Machine</Button>}
            {status && <DeviceStatus name={selectedBinding.name} {...status} />}
            {brewStatus && <BrewStatus {...brewStatus} />}
            {brewComplete && <BrewComplete {...brewComplete} />}
          </>
        )}
      </Content>
    </>
  )
}