import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HyundaiLogo from "/images/logo/logo_main.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import Modal from "../common/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import IsSelectCarModalOpen from "../../states/model-select/IsSelectCarModalOpen";
import { CategoryCars } from "../../types/CarCategory";
import IsCloseModalOpen from "../../states/model-select/IsCloseModalOpen";
import CarSelectModal from "./CarSelectModal";
import useCategoryCars from "../../hooks/queries/menu/useCategoryCars";
import { memo } from "react";

const ModelSelectHeader = styled.header`
  background-color: #e4dcd3;
`;

interface CarSelectModalButtonProps {
  carName: string;
}

function CarSelectModalButton({ carName }: CarSelectModalButtonProps) {
  const [isSelectModalOpen, setIsSelectModalOpen] =
    useRecoilState(IsSelectCarModalOpen);

  return (
    <button
      className="flex flex-row"
      onClick={() => setIsSelectModalOpen(!isSelectModalOpen)}
    >
      <div className="mr-1 text-sm">{carName}</div>
      {isSelectModalOpen ? <RxTriangleUp /> : <RxTriangleDown />}
    </button>
  );
}

const PageIndexDiv = styled.div<{ isSelectModalOpen: boolean }>`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  display: ${(props) => props.isSelectModalOpen && "none"};
  padding-left: 1.5rem;
`;

function PageIndex() {
  const isSelectModalOpen = useRecoilValue(IsSelectCarModalOpen);

  return (
    <PageIndexDiv isSelectModalOpen={isSelectModalOpen}>
      <div className="px-1 cursor-pointer">01 모델 선택</div>
      <div className="px-4 ">|</div>
      <div className="text-gray-500">02 내 차 만들기</div>
    </PageIndexDiv>
  );
}

interface ModelSelectHeaderProps {
  carId: number;
}

function getCarName(data: CategoryCars[], carId: number): string {
  for (const category of data) {
    const found = category.cars.find((car) => car.carId === carId);
    if (found) {
      return found.carName;
    }
  }
  return "Error";
}

export default memo(({ carId }: ModelSelectHeaderProps) => {
  const navigate = useNavigate();

  const [isCloseModalOpen, setIsCloseModalOpen] =
    useRecoilState(IsCloseModalOpen);

  const isSelectModalOpen = useRecoilValue(IsSelectCarModalOpen);

  const { isLoading, error, data } = useCategoryCars();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <ModelSelectHeader>
        <div className="flex flex-col py-4 w-full">
          <div className="flex flex-row items-center mb-6 px-6">
            <button onClick={() => setIsCloseModalOpen(true)}>
              <img src={HyundaiLogo}></img>
            </button>
            <div className="px-4">|</div>
            <CarSelectModalButton carName={getCarName(data, carId)} />
          </div>
          <div className="relative">
            {isSelectModalOpen && (
              <CarSelectModal data={data} currentCarId={carId} />
            )}
            <PageIndex />
          </div>
        </div>
        <button
          className="absolute right-5 top-5 flex flex-row items-center justify-center"
          onClick={() => setIsCloseModalOpen(true)}
        >
          <div className="pr-2">종료</div>
          <MdLogout />
        </button>
        {isCloseModalOpen && (
          <Modal
            onAccept={() => navigate("/")}
            closeModal={() => setIsCloseModalOpen(false)}
            text="내 차 만들기를 종료하시겠습니까?"
          />
        )}
      </ModelSelectHeader>
    </>
  );
});
