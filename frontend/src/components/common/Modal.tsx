import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import BackDrop from "./BackDrop";
import { SelectButton } from "./button/Button";

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
  width: 500px;
  height: 300px;
  background-color: white;
`;

const IconClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ModalText = styled.div`
  margin-bottom: 4rem;
`;

function Modal({ text, onAccept, closeModal }: ModalProps) {
  return (
    <BackDrop>
      <ModalContainer>
        <IconClose onClick={closeModal}>
          <AiOutlineClose />
        </IconClose>
        <ModalText>{text}</ModalText>
        <div className="w-1/2 flex flex-row text-sm">
          <SelectButton onClick={closeModal} className="mr-4">
            취소
          </SelectButton>
          <SelectButton primary={true} onClick={onAccept}>
            확인
          </SelectButton>
        </div>
      </ModalContainer>
    </BackDrop>
  );
}

export default Modal;
