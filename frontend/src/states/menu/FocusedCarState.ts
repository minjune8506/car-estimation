import { atom } from "recoil";

export default atom<number | null>({
  key: "focusedCar",
  default: undefined,
});
