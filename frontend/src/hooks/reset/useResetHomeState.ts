import { useResetRecoilState } from "recoil";
import SelectedCar from "../../states/home/SelectedCar";
import SelectedCarCategory from "../../states/home/SelectedCarCategory";
import IsMainMenuOpen from "../../states/home/IsMainMenuOpen";
import { useEffect } from "react";

export function useResetHomeState() {
  const resetIsMainMenuOpen = useResetRecoilState(IsMainMenuOpen);
  const resetSelectedCarCategory = useResetRecoilState(SelectedCarCategory);
  const resetSelectedCar = useResetRecoilState(SelectedCar);

  useEffect(() => {
    resetIsMainMenuOpen();
    resetSelectedCarCategory();
    resetSelectedCar();
  });
}
