import { atom } from "recoil";
import { MODEL_SELECT_KEYS } from "./stateKeys";

export const IsCloseModalOpen = atom<boolean>({
  key: MODEL_SELECT_KEYS.MODEL_SELECT_IS_CLOSE_MODAL_OPEN,
  default: false,
});

export const IsSelectCarModalOpen = atom<boolean>({
  key: MODEL_SELECT_KEYS.MODEL_SEELCT_IS_SELECT_CAR_MODAL_OPEN,
  default: false,
});

export const SelectedCategory = atom<number | null>({
  key: MODEL_SELECT_KEYS.MODEL_SELECT_SELECTED_CATEGORY,
  default: null,
});
