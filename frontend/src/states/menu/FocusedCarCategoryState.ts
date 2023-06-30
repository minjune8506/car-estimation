import { atom } from "recoil";

export default atom<number | undefined>({
  key: "focusedCarCategory",
  default: undefined,
});
