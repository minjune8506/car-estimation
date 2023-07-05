import { atom } from "recoil";
import { MENU_SELECTED_CAR } from "../stateKeys";

export default atom<number | null>({
  key: MENU_SELECTED_CAR,
  default: undefined,
});
