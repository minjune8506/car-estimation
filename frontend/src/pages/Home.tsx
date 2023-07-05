import CarSlider from "../components/home/CarSlider";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import { useResetHomeState } from "../hooks/reset/useResetHomeState";

export default () => {
  useResetHomeState();
  return (
    <>
      <Header />
      <CarSlider />
      <Footer />
    </>
  );
};
