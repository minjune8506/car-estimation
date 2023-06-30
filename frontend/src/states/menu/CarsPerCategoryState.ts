import { atom } from "recoil";
import { CarsPerCategory } from "../../types/Car";

export default atom<CarsPerCategory[]>({
  key: "CarsPerCategory",
  default: [],
});
