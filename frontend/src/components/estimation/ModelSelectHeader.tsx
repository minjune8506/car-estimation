import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HyundaiLogo from "/images/logo/logo_main.svg";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import Modal from "../common/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import IsCloseModalOpenState from "../../states/model-select/IsCloseModalOpenState";
import IsSelectModalOpenState from "../../states/model-select/IsSelectModalOpenState";
import CarSelectModal from "./CarSelectModal";
import BackDrop from "../common/BackDrop";

const ModelSelectHeader = styled.header`
  background-color: #e4dcd3;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
`;

function CarSelectModalButton() {
  const [isSelectModalOpen, setIsSelectModalOpen] = useRecoilState(
    IsSelectModalOpenState
  );

  return (
    <StyledButton
      className="flex flex-row"
      onClick={() => setIsSelectModalOpen(!isSelectModalOpen)}
    >
      <div className="mr-1">더 뉴 아반떼</div>
      {isSelectModalOpen ? <RxTriangleUp /> : <RxTriangleDown />}
    </StyledButton>
  );
}

const PageIndexDiv = styled.div<{ isSelectModalOpen: boolean }>`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  display: ${(props) => props.isSelectModalOpen && "none"};
`;

function PageIndex() {
  const isSelectModalOpen = useRecoilValue(IsSelectModalOpenState);

  return (
    <PageIndexDiv isSelectModalOpen={isSelectModalOpen}>
      <div className="px-1 cursor-pointer">01 모델 선택</div>
      <div className="px-4 ">|</div>
      <div className="text-gray-500">02 내 차 만들기</div>
    </PageIndexDiv>
  );
}

export default () => {
  const navigate = useNavigate();

  const [isCloseModalOpen, setIsCloseModalOpen] = useRecoilState(
    IsCloseModalOpenState
  );

  const [isSelectModalOpen, setIsSelectModalOpen] = useRecoilState(
    IsSelectModalOpenState
  );

  return (
    <>
      <ModelSelectHeader>
        <div className="flex flex-col py-4 w-full">
          <div className="flex flex-row items-center mb-6">
            <button onClick={() => setIsCloseModalOpen(true)}>
              <img src={HyundaiLogo}></img>
            </button>
            <div className="px-4">|</div>
            <CarSelectModalButton />
          </div>
          <div className="relative">
            {isSelectModalOpen && (
              <BackDrop>
                <CarSelectModal />
              </BackDrop>
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
};
