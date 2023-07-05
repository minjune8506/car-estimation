import { atom } from "recoil";
import { MODEL_SEELCT_IS_SELECT_CAR_MODAL_OPEN } from "../stateKeys";

export default atom<boolean>({
  key: MODEL_SEELCT_IS_SELECT_CAR_MODAL_OPEN,
  default: false,
});
