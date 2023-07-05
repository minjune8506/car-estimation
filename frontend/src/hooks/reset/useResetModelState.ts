import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ModelKeys } from "../queries/queryKeys";
import { Location } from "react-router-dom";
import IsCloseModalOpen from "../../states/model-select/IsCloseModalOpen";
import IsSelectCarModalOpen from "../../states/model-select/IsSelectCarModalOpen";
import SelectedCategory from "../../states/model-select/SelectedCategory";
import EnableDrivingTypes from "../../states/model-select/EnableDrivingTypes";
import EnableMisisons from "../../states/model-select/EnableMisisons";
import SelectedDrivingType from "../../states/model-select/SelectedDrivingType";
import SelectedEngine from "../../states/model-select/SelectedEngine";
import SelectedMission from "../../states/model-select/SelectedMission";

export default function useResetModelState(location: Location) {
  const resetEnableDirvingTypes = useResetRecoilState(EnableDrivingTypes);
  const resetEnableMissions = useResetRecoilState(EnableMisisons);

  const resetCloseModal = useResetRecoilState(IsCloseModalOpen);
  const resetSelectModal = useResetRecoilState(IsSelectCarModalOpen);

  const resetSelectedCategory = useResetRecoilState(SelectedCategory);
  const resetSelectedDrivingType = useResetRecoilState(SelectedDrivingType);
  const resetSelectedEngine = useResetRecoilState(SelectedEngine);
  const resetselectedMission = useResetRecoilState(SelectedMission);

  const queryClient = useQueryClient();

  useEffect(() => {
    // reset model state
    resetCloseModal();
    resetSelectModal();
    resetSelectedCategory();
    resetEnableDirvingTypes();
    resetEnableMissions();
    resetSelectedDrivingType();
    resetSelectedEngine();
    resetselectedMission();

    // invalidate query
    queryClient.invalidateQueries({
      queryKey: ModelKeys.filterAll,
    });
  }, [location]);
}
