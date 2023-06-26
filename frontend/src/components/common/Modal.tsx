import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  text: string;
  onAccept: () => void;
  closeModal: () => void;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: white;
`;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const IconClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ModalText = styled.div`
  margin-bottom: 4rem;
`;

const ButtonWrap = styled.div.attrs({ className: "flex flex-row" })``;

const CloseButton = styled.button.attrs({
  className: "py-2 px-8 text-white font-bold text-sm mr-4",
})`
  background-color: #767676;
`;

const OpenButton = styled.button.attrs({
  className: "py-2 px-8 text-white font-bold text-sm",
})`
  background-color: #002c5f;
`;

function Modal({ text, onAccept, closeModal }: ModalProps) {
  return (
    <BackDrop>
      <ModalContainer>
        <IconClose onClick={closeModal}>
          <AiOutlineClose />
        </IconClose>
        <ModalText>{text}</ModalText>
        <ButtonWrap>
          <CloseButton onClick={closeModal}>취소</CloseButton>
          <OpenButton onClick={onAccept}>확인</OpenButton>
        </ButtonWrap>
      </ModalContainer>
    </BackDrop>
  );
}

export default Modal;
