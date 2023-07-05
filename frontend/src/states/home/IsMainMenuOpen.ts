import { atom } from "recoil";
import { MENU_MAIN_IS_OPENED } from "../stateKeys";

export default atom<boolean>({
  key: MENU_MAIN_IS_OPENED,
  default: false,
});
