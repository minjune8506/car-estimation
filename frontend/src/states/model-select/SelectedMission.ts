import { atom } from "recoil";
import { MODEL_SELECT_SELECTED_MISSION } from "../stateKeys";

export default atom<number | undefined>({
  key: MODEL_SELECT_SELECTED_MISSION,
  default: undefined,
});
