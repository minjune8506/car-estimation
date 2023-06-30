import { atom } from "recoil";

export default atom<boolean>({
  key: "isMainMenuOpen",
  default: false,
});
