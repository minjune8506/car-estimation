import Menu from "src/components/menu/Menu";
import CarSlider from "../components/home/CarSlider";
import Footer from "../components/home/Footer";
import MenuNavigation from "src/components/navigation/MenuNavigation";

export default () => {
  return (
    <>
      <header className="w-full fixed top-0 z-10">
        <Menu />
        <MenuNavigation />
      </header>
      <CarSlider />
      <Footer />
    </>
  );
};
