import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import {
  IsMainMenuOpen,
  menuSelectedCar,
  menuSelectedCategory,
} from "src/states/HomeState";

export function useResetHomeState() {
  const resetIsMainMenuOpen = useResetRecoilState(IsMainMenuOpen);
  const resetSelectedCarCategory = useResetRecoilState(menuSelectedCategory);
  const resetSelectedCar = useResetRecoilState(menuSelectedCar);

  useEffect(() => {
    return () => {
      resetIsMainMenuOpen();
      resetSelectedCarCategory();
      resetSelectedCar();
    };
  });
}
