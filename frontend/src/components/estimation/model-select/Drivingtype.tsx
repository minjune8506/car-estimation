import { ModelSelectButton } from "../../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import { Filter, ModelType } from "src/types/Model";
import { useModelFilter } from "src/hooks/queries/model/Model";
import { useLocation } from "react-router-dom";
import { getCarIdFrom } from "src/common/utils/location-utils";

interface DrivingTypeProps {
  drivingTypes: ModelType[];
  selectedEngine: number;
  selectedMission: number;
  selectedDrivingType: number;
  setDrivingType: (id: number) => void;
}

export default function DrivingType({
  drivingTypes,
  selectedMission,
  selectedEngine,
  selectedDrivingType,
  setDrivingType,
}: DrivingTypeProps) {
  const carId = getCarIdFrom(useLocation());

  const { data, error, isLoading } = useModelFilter("mission", {
    carId,
    engineId: selectedEngine,
    missionId: selectedMission,
  });

  console.log("driving type useFilter");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error, selectedEngine, selectedMission);
    return <div>{error.message}</div>;
  }

  if (drivingTypes.length <= 1) {
    return;
  }
  const enableDrivingTypes = data.drivingTypes;

  return (
    <ModelTypeInfo type={Filter.DRIVING_TYPE}>
      {drivingTypes.map((drivingType) => {
        const found = enableDrivingTypes.find(
          (enableDrivingType) => enableDrivingType.id === drivingType.id
        );
        return (
          <ModelSelectButton
            key={drivingType.id}
            selected={selectedDrivingType === drivingType.id}
            onClick={() => setDrivingType(drivingType.id)}
            className="py-2"
            disabled={found ? false : true}
          >
            {drivingType.name}
          </ModelSelectButton>
        );
      })}
    </ModelTypeInfo>
  );
}
