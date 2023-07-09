import { useRecoilState, useRecoilValue } from "recoil";
import { Filter, ModelType } from "../../types/ModelFilter";
import { ModelSelectButton } from "../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import SelectedDrivingType from "../../states/model-select/SelectedDrivingType";
import EnableDrivingTypes from "../../states/model-select/EnableDrivingTypes";

interface DrivingTypeProps {
  drivingTypes: ModelType[];
}

export default ({ drivingTypes }: DrivingTypeProps) => {
  const [selected, setSelected] = useRecoilState(SelectedDrivingType);
  const enableDrivingTypes = useRecoilValue(EnableDrivingTypes);

  if (drivingTypes.length <= 1) {
    return;
  }

  return (
    <ModelTypeInfo type={Filter.DRIVING_TYPE}>
      {drivingTypes.map((drivingType) => {
        const found = enableDrivingTypes.find(
          (enableDrivingType) => enableDrivingType.id === drivingType.id
        );
        return (
          <ModelSelectButton
            key={drivingType.id}
            selected={selected === drivingType.id}
            onClick={() => setSelected(drivingType.id)}
            className="py-2"
            disabled={found ? false : true}
          >
            {drivingType.name}
          </ModelSelectButton>
        );
      })}
    </ModelTypeInfo>
  );
};
