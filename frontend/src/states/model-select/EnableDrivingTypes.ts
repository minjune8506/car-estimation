import { atom } from "recoil";
import { ModelType } from "../../types/ModelFilter";
import { MODEL_SELECT_ENABLE_DRIVING_TYPES } from "../stateKeys";

export default atom<ModelType[]>({
  key: MODEL_SELECT_ENABLE_DRIVING_TYPES,
  default: [],
});
