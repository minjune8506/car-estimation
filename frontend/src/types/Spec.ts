import { ExteriorColor, InteriorColor } from "./Color";
import { Model } from "./Model";

export interface SpecOption {
  optionCategoryId: number;
  optionCategoryName: string;
  optionId: number;
  optionName: string;
  price: number;
  img: string;
  unityChoiceYn: "Y" | "N";
  defaultYn: "Y" | "N";
  enable: "Y" | "N";
}

export interface SpecColor {
  interior: InteriorColor;
  exterior: ExteriorColor;
}

export interface SpecInfo {
  specId: number;
  specCode: string;
  colors: SpecColor[];
  options: SpecOption[];
}

export interface CheckSpec {
  available: "Y" | "N";
}

export interface CheckSpecFail extends CheckSpec {
  specCode: string;
  exteriorColorId: number;
  interiorColorId: number;
}

export interface SpecOptionConstraint {
  option: SpecOption;
  specCode: string;
  action: Action;
}

export enum Action {
  ADD = "ADD",
  DELETE = "DELETE",
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

export interface SpecColorChangeFail {
  changeExteriorColorYn: string;
}

export interface SpecColorChangeSuccess {
  modelInfo: Model;
  exteriorColor: ExteriorColor;
  interiorColor: InteriorColor;
  delOptions: SpecOption[];
  addOptions: SpecOption[];
}
