import { useRecoilState, useSetRecoilState } from "recoil";
import { Filter, ModelType } from "../../types/ModelFilter";
import { ModelSelectButton } from "../common/button/Button";
import ModelTypeInfo from "./ModelTypeInfo";
import { useEffect } from "react";
import SelectedEngine from "../../states/model-select/SelectedEngine";
import SelectedMission from "../../states/model-select/SelectedMission";
import EnableMisisons from "../../states/model-select/EnableMisisons";
import useModelFilter from "../../hooks/queries/model/useModelFilter";

interface EngineProps {
  engines: ModelType[];
  carId: number;
}

export default ({ engines, carId }: EngineProps) => {
  const [selectedEngine, setSelectedEngine] = useRecoilState(SelectedEngine);
  const setSelectedMission = useSetRecoilState(SelectedMission);
  const setEnableMissions = useSetRecoilState(EnableMisisons);

  const { isLoading, isError, error, data } = useModelFilter({
    carId,
    engineId: selectedEngine,
  });

  useEffect(() => {
    if (!selectedEngine) {
      setSelectedEngine(engines[0].id);
    }
    if (data) {
      data.missions.length && setSelectedMission(data.missions[0].id);
      setEnableMissions(data.missions);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <ModelTypeInfo type={Filter.ENGINE}>
      {engines.map((engine) => (
        <ModelSelectButton
          key={engine.id}
          selected={engine.id === selectedEngine}
          onClick={() => setSelectedEngine(engine.id)}
          className="py-2"
        >
          {engine.name}
        </ModelSelectButton>
      ))}
    </ModelTypeInfo>
  );
};
