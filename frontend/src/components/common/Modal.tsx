import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import BackDrop from "./BackDrop";
import { SelectButton } from "./button/Button";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  accept?: boolean;
  acceptButtonText?: string;
  onAccept?: () => void;
  cancel?: boolean;
  cancelButtonText?: string;
  onCancel?: () => void;
}

function Modal({
  children,
  accept,
  acceptButtonText,
  onAccept,
  cancel,
  cancelButtonText,
  onCancel,
}: ModalProps) {
  return (
    <BackDrop>
      <ModalContainer>
        <IconClose onClick={onCancel}>
          <AiOutlineClose />
        </IconClose>
        <ModalText>{children}</ModalText>
        <div className="w-1/2 flex flex-row text-sm">
          {cancel && (
            <SelectButton onClick={onCancel} className="mr-4">
              {cancelButtonText || "취소"}
            </SelectButton>
          )}
          {accept && (
            <SelectButton primary={true} onClick={onAccept}>
              {acceptButtonText || "확인"}
            </SelectButton>
          )}
        </div>
      </ModalContainer>
    </BackDrop>
  );
}

export default Modal;

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
