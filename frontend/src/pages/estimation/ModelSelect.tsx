import ModelContainer from "../../components/estimation/ModelCards";
import ModelTypeInfo from "../../components/estimation/ModelTypes";
import ModelSelectHeader from "../../components/estimation/ModelSelectHeader";
import { useSetRecoilState } from "recoil";
import IsSelectModalOpenState from "../../states/model-select/IsSelectModalOpenState";
import { useEffect } from "react";
import IsCloseModalOpenState from "../../states/model-select/IsCloseModalOpenState";

export default () => {
  const setIsSelectModalOpen = useSetRecoilState(IsSelectModalOpenState);

  const setIsCloseModalOpen = useSetRecoilState(IsCloseModalOpenState);

  useEffect(() => {
    setIsSelectModalOpen(false);
    setIsCloseModalOpen(false);
  });

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
