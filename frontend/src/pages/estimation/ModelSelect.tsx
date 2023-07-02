import ModelContainer from "../../components/estimation/ModelCards";
import ModelTypeInfo from "../../components/estimation/ModelTypes";
import ModelSelectHeader from "../../components/estimation/ModelSelectHeader";
import CarSelectModal from "../../components/estimation/CarSelectModal";
import { useRecoilState } from "recoil";
import IsSelectModalOpenState from "../../states/model-select/IsSelectModalOpenState";

export default () => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useRecoilState(
    IsSelectModalOpenState
  );
  return (
    <>
      <ModelSelectHeader />
      <main className="flex flex-col">
        <div className="w-full flex flex-row py-6">
          <ModelTypeInfo></ModelTypeInfo>
        </div>
        <ModelContainer />
      </main>
    </>
  );
};
