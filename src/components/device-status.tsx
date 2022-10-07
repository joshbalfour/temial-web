import styled, { css } from "styled-components"

import { StatusMessageContent } from "../temial/src"
import freshWater from '../images/ic_fill_water_tank.jpg'
import closeLid from '../images/ic_close_lid.jpg'
import wasteWaterTank from '../images/ic_residual_water_tank.jpg'
import brewingChamber from '../images/ic_brewing_chamber.jpg'
import offline from '../images/offline.png'
import connected from '../images/connected.png'
import inUse from '../images/in_use.png'

const StatusMessage = styled.div<{ large?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 210px;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 1rem;

  ${props => props.large && css`
    max-width: unset;
    box-shadow: none;
  `}

  img {
    height: 210px;
    margin-bottom: 1rem;
  }
`

const ErrorMessages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  margin-top: 3rem;
  flex-wrap: wrap;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const DeviceImage = styled.div<{ src: string, alt: string, fullScreen?: boolean }>`
  width: 210px;
  height: 320px;
  margin-bottom: 1rem;

  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${props => props.fullScreen && css`
    width: 50vw;
    height: 50vh;
  `}
`

const ErrorText = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`

const deviceIsInUse = (deviceState: number) => [4, 3, 2, 5].includes(deviceState)
type DeviceUsageType = 'device_status_in_use_title' | 'device_state_pump_empty' | 'device_state_descaling' | 'device_state_cleaning_long' | 'device_state_cleaning_short'
const getDeviceUsageType = (deviceState: number): DeviceUsageType => {
  return deviceState !== 2 ? deviceState !== 3 ? deviceState !== 4 ? deviceState !== 5 ? 'device_status_in_use_title' : 'device_state_pump_empty' : 'device_state_descaling' : 'device_state_cleaning_long' : 'device_state_cleaning_short'
}

const deviceUsageToMessage = (deviceUsageType: DeviceUsageType): string => {
  switch (deviceUsageType) {
    case 'device_status_in_use_title':
      return ' is brewing'
    case 'device_state_pump_empty':
      return '\'s Pump is empty'
    case 'device_state_descaling':
      return ' is descaling'
    case 'device_state_cleaning_long':
      return ' is doing an intensive clean'
    case 'device_state_cleaning_short':
      return ' is doing a short clean'
  }
}

export const DeviceStatus = ({ enoughFreshWater, isOffline, lidClosed, wasteWaterTankFull, wasteWaterTankPresent, chamberPresent, name, deviceState, activityState, cleaningLong, cleaningShort }: StatusMessageContent & { name: string }) => {
  const shortCleanSuggested = !!cleaningShort
  const longCleanSuggested = !!cleaningLong
  const isDoingSomething = deviceIsInUse(deviceState)

  if (isOffline) {
    return <StatusMessage large><DeviceImage src={offline} alt="offline" /> {name} is offline</StatusMessage>
  }
  const isOk = enoughFreshWater && lidClosed && !wasteWaterTankFull && wasteWaterTankPresent && chamberPresent
  if (isOk && !isDoingSomething) {
    return <StatusMessage large><DeviceImage fullScreen src={connected} alt="connected" /> {name} is online and ready to brew</StatusMessage>
  }

  if (isDoingSomething) {
    return <StatusMessage large><DeviceImage fullScreen src={inUse} alt="in use" /> {name}{deviceUsageToMessage(getDeviceUsageType(deviceState))}</StatusMessage>
  }

  return (
    <Container>
      <DeviceImage src={connected} alt="connected" />
      <ErrorText>{name} is online but not ready to brew</ErrorText>
      {shortCleanSuggested && <ErrorText>Short clean suggested</ErrorText>}
      {longCleanSuggested && <ErrorText>Intensive clean suggested</ErrorText>}
      <ErrorMessages>
        {!enoughFreshWater && <StatusMessage>
          <img src={freshWater} alt="water" />
          Not enough fresh water
        </StatusMessage>}
        {!lidClosed && <StatusMessage>
          <img src={closeLid} alt="close lid" />
          Lid is not closed
        </StatusMessage>}
        {wasteWaterTankFull && <StatusMessage>
          <img src={wasteWaterTank} alt="waste water tank" />
          Waste water tank is full
        </StatusMessage>}
        {!wasteWaterTankPresent && <StatusMessage><img src={wasteWaterTank} alt="waste water tank" /> Waste water tank is not present</StatusMessage>}
        {!chamberPresent && <StatusMessage><img src={brewingChamber} alt="brewing chamber" /> Chamber is not present</StatusMessage>}
      </ErrorMessages>
    </Container>
  )
}
