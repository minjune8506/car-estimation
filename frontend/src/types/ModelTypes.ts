export interface ModelType {
  id: number;
  name: string;
}

export interface ModelTypes {
  engineType: ModelType[];
  missionType: ModelType[];
  driveType: ModelType[];
}
