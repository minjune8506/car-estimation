import { useEffect } from "react";
import CarSlider from "../components/home/CarSlider";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import { useSetRecoilState } from "recoil";
import IsMainMenuOpenState from "../states/menu/IsMainMenuOpenState";
import FocusedCarCategoryState from "../states/menu/FocusedCarCategoryState";
import FocusedCarState from "../states/menu/FocusedCarState";

export default () => {
  const setIsMainMenuOpen = useSetRecoilState(IsMainMenuOpenState);
  const setFocusedCarCategory = useSetRecoilState(FocusedCarCategoryState);
  const setFocusedCar = useSetRecoilState(FocusedCarState);

  useEffect(() => {
    setIsMainMenuOpen(false);
    setFocusedCarCategory(undefined);
    setFocusedCar(null);
  });

  return (
    <>
      <Header />
      <CarSlider />
      <Footer />
    </>
  );
};
