import dayjs from "dayjs";
import { BrewingCompleteContent } from "../temial/src";

export const BrewComplete = ({ timestamp }: BrewingCompleteContent) => (
  <div>
    <h3>Brewing Complete!</h3>
    <div>Completed at: {dayjs(timestamp).format()}</div>
  </div>
)