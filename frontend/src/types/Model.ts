import { SpecOption } from "./Spec";

export enum Filter {
  ENGINE = "엔진",
  MISSION = "변속기",
  DRIVING_TYPE = "구동 방식",
}

export interface ModelFilterQueryParam {
  carId: number;
  engineId?: number;
  missionId?: number;
}

export interface ModelType {
  id: number;
  name: string;
}

export interface ModelTypes {
  engines: ModelType[];
  missions: ModelType[];
  drivingTypes: ModelType[];
}

export interface ModelTrimsQueryParam {
  carId: number;
  engineId?: number;
  missionId?: number;
  drivingTypeId?: number;
}

export interface Model {
  id: number;
  trimName: string;
  name: string;
  basicInfo: string;
  price: number;
  imgPath: string;
  detailImgs: string[];
}

export interface ModelOptions {
  specCode: string;
  options: SpecOption[];
}
