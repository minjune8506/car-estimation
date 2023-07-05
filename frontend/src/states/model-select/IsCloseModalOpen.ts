import { atom } from "recoil";
import { MODEL_SELECT_IS_CLOSE_MODAL_OPEN } from "../stateKeys";

export default atom<boolean>({
  key: MODEL_SELECT_IS_CLOSE_MODAL_OPEN,
  default: false,
});
