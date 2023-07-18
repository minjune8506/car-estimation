import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HyundaiLogo from "/images/logo/logo_main.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import Modal from "../common/Modal";
import CarSelectModal from "./model-select/CarSelectModal";
import { memo, useState } from "react";
import { getCarName } from "../../common/utils/car-utils";
import { useCategoryCars } from "src/hooks/queries/car/CategoryCars";
import { getCarIdFrom } from "src/common/utils/location-utils";

interface ModelSelectHeaderProps {
  current?: "Model-Select" | "Car-Making";
}

function Header({ current }: ModelSelectHeaderProps) {
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const carId = getCarIdFrom(useLocation());

  const { data } = useCategoryCars();
  const navigate = useNavigate();

  if (!data) return;

  const onNavigateModelSelect = (carId: number) => {
    setIsCloseModalOpen(false);
    setSelectModalOpen(false);
    navigate(`?carId=${carId}`);
  };

  return (
    <header className="bg-[#e4dcd3] flex flex-col py-4 relative h-[100px]">
      <div className="flex flex-row items-center mb-6 mx-6">
        <button onClick={() => setIsCloseModalOpen(true)}>
          <img src={HyundaiLogo}></img>
        </button>
        <span className="px-4">|</span>
        <button
          className="flex flex-row"
          onClick={() => setSelectModalOpen(!isSelectModalOpen)}
        >
          <div className="mr-1 text-sm">{getCarName(data, carId)}</div>
          {isSelectModalOpen ? <RxTriangleUp /> : <RxTriangleDown />}
        </button>
      </div>
      {isSelectModalOpen ? (
        <div className="relative">
          {isSelectModalOpen && (
            <CarSelectModal
              onNavigateModelSelect={onNavigateModelSelect}
              data={data}
              currentCarId={carId}
              isOpen={isSelectModalOpen}
              closeModal={() => setSelectModalOpen(false)}
            />
          )}
        </div>
      ) : (
        <PageIndexDiv>
          <IndexButton current={current === "Model-Select"}>
            01 모델 선택
          </IndexButton>
          <div className="px-4 ">|</div>
          <IndexButton current={current === "Car-Making"}>
            02 내 차 만들기
          </IndexButton>
        </PageIndexDiv>
      )}
      <button
        className="absolute right-5 top-5 flex"
        onClick={() => setIsCloseModalOpen(true)}
      >
        <div className="pr-2">종료</div>
        <MdLogout />
      </button>
      {isCloseModalOpen && (
        <Modal
          onAccept={() => {
            setSelectModalOpen(false);
            setIsCloseModalOpen(false);
            navigate("/");
          }}
          onCancel={() => setIsCloseModalOpen(false)}
          accept={true}
          cancel={true}
        >
          내 차 만들기를 종료하시겠습니까?
        </Modal>
      )}
    </header>
  );
}

export default memo(Header);

const PageIndexDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  padding-left: 1.5rem;
`;

const IndexButton = styled.button<{ current?: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.current ? "black" : "gray")};
`;
