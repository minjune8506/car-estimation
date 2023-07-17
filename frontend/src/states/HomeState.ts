import { atom } from "recoil";
import { HOME_STATE_KEYS } from "./stateKeys";

export const IsMainMenuOpen = atom<boolean>({
  key: HOME_STATE_KEYS.MENU_MAIN_IS_OPENED,
  default: false,
});

export const menuSelectedCar = atom<number | null>({
  key: HOME_STATE_KEYS.MENU_SELECTED_CAR,
  default: undefined,
});

export const menuSelectedCategory = atom<number | undefined>({
  key: HOME_STATE_KEYS.MENU_SELECTED_CAR_CATEGORY,
  default: undefined,
});
