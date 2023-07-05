export interface ModelTrimQueryParam {
  carId: number;
  engineId: number;
  missionId: number;
  drivingTypeId: number;
}

export interface ModelTrim {
  id: number;
  trimName: string;
  price: number;
  basicInfo: string;
  modelImg: string;
  detailImgs: string[];
}
