import { atom } from "recoil";
import { MODEL_SELECT_SELECTED_CATEGORY } from "../stateKeys";

export default atom<number | null>({
  key: MODEL_SELECT_SELECTED_CATEGORY,
  default: null,
});
