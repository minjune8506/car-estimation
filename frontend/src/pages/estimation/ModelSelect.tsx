import { useLocation } from "react-router-dom";
import ModelTypeInfos from "components/estimation/model-select/ModelTypeInfos";
import Header from "components/estimation/Header";
import ModelCards from "src/components/estimation/model-select/ModelCards";
import { useState } from "react";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { useModelTrims } from "src/hooks/queries/model/Model";

export default function ModelSelect() {
  const [selectedEngine, setEngine] = useState<number | undefined>(undefined);
  const [selectedMission, setMission] = useState<number | undefined>(undefined);
  const [selectedDrivingType, setDrivingType] = useState<number | undefined>(
    undefined
  );
  const carId = getCarIdFrom(useLocation());

  const isReady = selectedEngine && selectedMission && selectedDrivingType;

  const models = useModelTrims(
    carId,
    selectedEngine,
    selectedMission,
    selectedDrivingType,
    isReady
  );

  console.log(selectedEngine, selectedMission, selectedDrivingType);

  return (
    <>
      <Header current="Model-Select" />
      <main className="flex flex-col px-6">
        <div className="w-full flex flex-row py-6">
          <ModelTypeInfos
            selectedEngine={selectedEngine}
            selectedMission={selectedMission}
            selectedDrivingType={selectedDrivingType}
            setEngine={setEngine}
            setMission={setMission}
            setDrivingType={setDrivingType}
          ></ModelTypeInfos>
        </div>
        {models.data && <ModelCards models={models.data} />}
      </main>
    </>
  );
}
