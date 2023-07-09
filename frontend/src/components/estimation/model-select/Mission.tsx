import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Filter, ModelType } from "../../../types/ModelFilter";
import { ModelSelectButton } from "../../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import { useEffect } from "react";
import SelectedEngine from "../../../states/model-select/SelectedEngine";
import EnableMisisons from "../../../states/model-select/EnableMisisons";
import SelectedMission from "../../../states/model-select/SelectedMission";
import SelectedDrivingType from "../../../states/model-select/SelectedDrivingType";
import EnableDrivingTypes from "../../../states/model-select/EnableDrivingTypes";
import useModelFilter from "../../../hooks/queries/model/useModelFilter";

interface Missionprops {
  missions: ModelType[];
  carId: number;
}

export default ({ missions, carId }: Missionprops) => {
  const selectedEngine = useRecoilValue(SelectedEngine);
  const enabledMissions = useRecoilValue(EnableMisisons);

  const [selectedMission, setSelectedMission] = useRecoilState(SelectedMission);

  const setSelectedDrivingType = useSetRecoilState(SelectedDrivingType);
  const setEnableDrivingTypes = useSetRecoilState(EnableDrivingTypes);

  const { isLoading, error, data } = useModelFilter({
    carId,
    engineId: selectedEngine,
    missionId: selectedMission,
  });

  useEffect(() => {
    if (data) {
      data.drivingTypes.length &&
        setSelectedDrivingType(data.drivingTypes[0].id);
      setEnableDrivingTypes(data.drivingTypes);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (missions.length <= 1) {
    return;
  }

  return (
    <ModelTypeInfo type={Filter.MISSION}>
      {missions.map((mission) => {
        let isDisabled = true;
        const found = enabledMissions.find(
          (enabledMission) => enabledMission.id === mission.id
        );
        if (found) {
          isDisabled = false;
        }
        return (
          <ModelSelectButton
            key={mission.id}
            selected={mission.id === selectedMission}
            onClick={() => setSelectedMission(mission.id)}
            disabled={isDisabled}
            className="py-2"
          >
            {mission.name}
          </ModelSelectButton>
        );
      })}
    </ModelTypeInfo>
  );
};
