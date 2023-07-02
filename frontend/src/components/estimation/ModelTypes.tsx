import { ModelTypes } from "../../types/ModelTypes";
import ModelType from "./ModelType";

const data: ModelTypes = {
  engineType: [
    {
      id: 1,
      name: "디젤",
    },
    {
      id: 2,
      name: "1.6 가솔린 터보",
    },
  ],
  missionType: [
    {
      id: 1,
      name: "A/T",
    },
    {
      id: 2,
      name: "DCT",
    },
  ],
  driveType: [
    {
      id: 1,
      name: "2WD",
    },
    {
      id: 2,
      name: "4WD",
    },
  ],
};

export default () => {
  return (
    <div className="flex flex-row">
      <ModelType type="엔진" data={data["engineType"]}></ModelType>
      <ModelType type="변속기" data={data["missionType"]}></ModelType>
      <ModelType type="구동방식" data={data["driveType"]}></ModelType>
    </div>
  );
};
