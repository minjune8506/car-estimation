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
