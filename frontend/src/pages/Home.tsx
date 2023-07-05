import { ErrorBoundary } from "react-error-boundary";
import CarSlider from "../components/home/CarSlider";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import { useResetHomeState } from "../hooks/reset/useResetHomeState";
import ErrorFallBack from "../components/common/ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export default () => {
  useResetHomeState();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={reset}>
        <Header />
      </ErrorBoundary>
      <CarSlider />
      <Footer />
    </>
  );
};
