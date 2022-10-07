import { BrewStatusContent } from "../temial/src"

export const BrewStatus = ({ currentTimeBrewing, currentTimeHeating, currentTimePrewash, estimatedTimeBrewing, estimatedTimeHeating, estimatedTimePrewash, remainingTotalTime, temperature }: BrewStatusContent) => {
  return (
    <div>
      <h3>Brewing Tea</h3>
      <div>Remaining total time: {remainingTotalTime} seconds</div>
      <div>Temperature: {temperature}°C</div>
      {estimatedTimePrewash && <div>Prewash: {currentTimePrewash}/{estimatedTimePrewash} seconds remaining</div>}
      <div>Estimated time heating: {currentTimeHeating}/{estimatedTimeHeating} seconds remaining</div>
      <div>Estimated time brewing: {currentTimeBrewing}/{estimatedTimeBrewing} seconds remaining</div>
    </div>
  )
}