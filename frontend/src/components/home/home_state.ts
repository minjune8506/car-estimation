import { atom } from "recoil";

export const headerMenuState = atom({
  key: "isMenuOpen",
  default: false,
});

export const focusedCategoryState = atom({
  key: "focusedCategory",
  default: "0",
});
