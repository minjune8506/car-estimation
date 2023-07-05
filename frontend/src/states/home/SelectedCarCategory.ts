import { atom } from "recoil";
import { MENU_SELECTED_CAR_CATEGORY } from "../stateKeys";

export default atom<number | undefined>({
  key: MENU_SELECTED_CAR_CATEGORY,
  default: undefined,
});
