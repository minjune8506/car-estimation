import { atom } from "recoil";
import { CarCategoryCars } from "../menu/types";

export const isMenuOpenState = atom<boolean>({
  key: "isMenuOpen",
  default: false,
});

export const focusedCarCategoryState = atom<number>({
  key: "focusedCarCategory",
  default: 0,
});

export const focusedCarState = atom<number | null>({
  key: "focusedCar",
  default: null,
});

export const carCategoryCarsState = atom<CarCategoryCars[]>({
  key: "categoryCars",
  default: [],
});
