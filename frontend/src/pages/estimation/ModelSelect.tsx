import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import useResetModelState from "hooks/reset/useResetModelState";
import SelectedEngine from "states/model-select/SelectedEngine";
import SelectedMission from "states/model-select/SelectedMission";
import SelectedDrivingType from "states/model-select/SelectedDrivingType";
import ErrorFallBack from "components/common/ErrorFallback";
import ModelTypeInfos from "components/estimation/model-select/ModelTypeInfos";
import Header from "components/estimation/Header";
import ModelCards from "components/estimation/model-select/ModelCards";
import QueryString from "qs";

export default function ModelSelect() {
  const location = useLocation();
  useResetModelState(location);

  const selectedEngine = useRecoilValue(SelectedEngine);
  const selectedMission = useRecoilValue(SelectedMission);
  const selectedDrivingType = useRecoilValue(SelectedDrivingType);

  const { carId } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const carIdNumber = parseInt(carId as string);

  const isReady = selectedEngine && selectedMission && selectedDrivingType;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Header carId={carIdNumber} current="Model-Select" />
      <main className="flex flex-col px-6">
        <div className="w-full flex flex-row py-6">
          <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={reset}>
            <ModelTypeInfos carId={carIdNumber}></ModelTypeInfos>
          </ErrorBoundary>
        </div>
        {isReady && (
          <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={reset}>
            <ModelCards
              carId={carIdNumber}
              engineId={selectedEngine}
              missionId={selectedMission}
              drivingTypeId={selectedDrivingType}
            />
          </ErrorBoundary>
        )}
      </main>
    </>
  );
}
