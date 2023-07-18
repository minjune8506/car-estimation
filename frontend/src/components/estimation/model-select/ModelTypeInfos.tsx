import Engine from "./Engine";
import Mission from "./Mission";
import Drivingtype from "./Drivingtype";
import { useModelFilter } from "src/hooks/queries/model/Model";
import { useEffect } from "react";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { useLocation } from "react-router-dom";

interface ModelTypeInfosProps {
  selectedEngine?: number;
  selectedMission?: number;
  selectedDrivingType?: number;
  setEngine: (id?: number) => void;
  setMission: (id?: number) => void;
  setDrivingType: (id?: number) => void;
}

export default ({
  selectedEngine,
  selectedMission,
  selectedDrivingType,
  setEngine,
  setMission,
  setDrivingType,
}: ModelTypeInfosProps) => {
  const carId = getCarIdFrom(useLocation());

  const { status, data } = useModelFilter("all", { carId });

  useEffect(() => {
    if (data && data.engines.length) {
      setEngine(data.engines[0].id);
      console.log("engine initial data", data.engines[0].id);
    }
    return () => {
      setEngine(undefined);
      setMission(undefined);
      setDrivingType(undefined);
      console.log("carId changed");
    };
  }, [carId, data]);

  return status === "success" ? (
    <div className="flex flex-row">
      {selectedEngine && (
        <Engine
          engines={data.engines}
          selectedEngine={selectedEngine}
          setEngine={setEngine}
          setMission={setMission}
        ></Engine>
      )}
      {selectedEngine && selectedMission && (
        <Mission
          missions={data.missions}
          selectedEngine={selectedEngine}
          selectedMission={selectedMission}
          setMission={setMission}
          setDrivingType={setDrivingType}
        ></Mission>
      )}
      {selectedEngine && selectedMission && selectedDrivingType && (
        <Drivingtype
          drivingTypes={data.drivingTypes}
          selectedEngine={selectedEngine}
          selectedMission={selectedMission}
          selectedDrivingType={selectedDrivingType}
          setDrivingType={setDrivingType}
        ></Drivingtype>
      )}
    </div>
  ) : (
    <div>error</div>
  );
};
