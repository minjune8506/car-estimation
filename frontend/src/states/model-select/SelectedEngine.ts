import { atom } from "recoil";
import { MODEL_SELECT_SELECTED_ENGINE } from "../stateKeys";

export default atom<number | undefined>({
  key: MODEL_SELECT_SELECTED_ENGINE,
  default: undefined,
});
