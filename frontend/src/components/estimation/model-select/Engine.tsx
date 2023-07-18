import { useEffect } from "react";
import { ModelSelectButton } from "../../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import { Filter, ModelType } from "src/types/Model";
import { useModelFilter } from "src/hooks/queries/model/Model";
import { getCarIdFrom } from "src/common/utils/location-utils";
import { useLocation } from "react-router-dom";

interface EngineProps {
  engines: ModelType[];
  selectedEngine: number;
  setEngine: (id?: number) => void;
  setMission: (id?: number) => void;
}

export default ({
  engines,
  selectedEngine,
  setMission,
  setEngine,
}: EngineProps) => {
  const carId = getCarIdFrom(useLocation());

  const { data } = useModelFilter("engine", {
    carId,
    engineId: selectedEngine,
  });

  useEffect(() => {
    if (data && data.missions.length) {
      setMission(data.missions[0].id);
    }
  }, [carId, data]);

  return (
    <ModelTypeInfo type={Filter.ENGINE}>
      {engines.map((engine) => (
        <ModelSelectButton
          key={engine.id}
          selected={engine.id === selectedEngine}
          onClick={() => {
            if (engine.id !== selectedEngine) {
              setEngine(engine.id);
              setMission(undefined);
            }
          }}
          className="py-2"
        >
          {engine.name}
        </ModelSelectButton>
      ))}
    </ModelTypeInfo>
  );
};
