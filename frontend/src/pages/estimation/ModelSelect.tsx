import ModelContainer from "../../components/estimation/ModelCards";
import ModelSelectHeader from "../../components/estimation/ModelSelectHeader";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import ModelTypeInfos from "../../components/estimation/ModelTypeInfos";
import useResetModelState from "../../hooks/reset/useResetModelState";
import { useRecoilValue } from "recoil";
import SelectedEngine from "../../states/model-select/SelectedEngine";
import SelectedMission from "../../states/model-select/SelectedMission";
import SelectedDrivingType from "../../states/model-select/SelectedDrivingType";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "../../components/common/ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default function ModelSelect() {
  const location = useLocation();
  useResetModelState(location);

  const selectedEngine = useRecoilValue(SelectedEngine);
  const selectedMission = useRecoilValue(SelectedMission);
  const selectedDrivingType = useRecoilValue(SelectedDrivingType);

  const queryString = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { carId } = queryString;
  const carIdNumber = parseInt(carId as string);

  const isReady = selectedEngine && selectedMission && selectedDrivingType;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <ModelSelectHeader carId={carIdNumber} />
      <main className="flex flex-col px-6">
        <div className="w-full flex flex-row py-6">
          <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={reset}>
            <ModelTypeInfos carId={carIdNumber}></ModelTypeInfos>
          </ErrorBoundary>
        </div>
        {isReady && (
          <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={reset}>
            <ModelContainer
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
