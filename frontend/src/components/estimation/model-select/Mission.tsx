import { ModelSelectButton } from "../../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import { useEffect, useState } from "react";
import { Filter, ModelType } from "src/types/Model";
import { useModelFilter } from "src/hooks/queries/model/Model";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { useLocation } from "react-router-dom";

interface Missionprops {
  missions: ModelType[];
  selectedEngine: number;
  selectedMission: number;
  setMission: (id: number) => void;
  setDrivingType: (id?: number) => void;
}

export default function Misson({
  missions,
  selectedEngine,
  selectedMission,
  setDrivingType,
  setMission,
}: Missionprops) {
  const carId = getCarIdFrom(useLocation());

  const enableMissionQuery = useModelFilter("engine", {
    carId,
    engineId: selectedEngine,
  });

  const drivingTypeQuery = useModelFilter("mission", {
    carId,
    engineId: selectedEngine,
    missionId: selectedMission,
  });
  console.log("mission useFilter");

  useEffect(() => {
    if (drivingTypeQuery.data) {
      drivingTypeQuery.data.drivingTypes.length &&
        setDrivingType(drivingTypeQuery.data.drivingTypes[0].id);
    }
  }, [carId, drivingTypeQuery.data]);

  if (enableMissionQuery.isLoading || drivingTypeQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (enableMissionQuery.error || drivingTypeQuery.error) {
    return <div>Error</div>;
  }

  if (missions.length <= 1) {
    return;
  }

  const enableMissions = enableMissionQuery.data.missions;

  return (
    <ModelTypeInfo type={Filter.MISSION}>
      {missions.map((mission) => {
        let isDisabled = true;
        const found = enableMissions.find(
          (enabledMission) => enabledMission.id === mission.id
        );
        if (found) {
          isDisabled = false;
        }
        return (
          <ModelSelectButton
            key={mission.id}
            selected={mission.id === selectedMission}
            onClick={() => {
              if (selectedMission !== mission.id) {
                setMission(mission.id);
                setDrivingType(undefined);
              }
            }}
            disabled={isDisabled}
            className="py-2"
          >
            {mission.name}
          </ModelSelectButton>
        );
      })}
    </ModelTypeInfo>
  );
}
