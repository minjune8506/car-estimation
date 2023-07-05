import { atom } from "recoil";
import { MODEL_SELECT_SELECTED_DRIVING_TYPE } from "../stateKeys";

export default atom<number | undefined>({
  key: MODEL_SELECT_SELECTED_DRIVING_TYPE,
  default: undefined,
});
