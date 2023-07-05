import { atom } from "recoil";
import { ModelType } from "../../types/ModelFilter";
import { MODEL_SELECT_ENABLE_MISSIONS } from "../stateKeys";

export default atom<ModelType[]>({
  key: MODEL_SELECT_ENABLE_MISSIONS,
  default: [],
});
