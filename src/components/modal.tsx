// Modal.tsx
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  z-index: 8;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const ModalCard = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  width: 1200px;
  height: 800px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  z-index: 9;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) =>
    props.isOpen
      ? "auto"
      : "none"}; /* предотвращаем взаимодействие с окном при его закрытии */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #ff5f5f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff4b4b;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={onClose} />
      <ModalCard isOpen={isOpen}>
        <CloseButton onClick={onClose}>Закрыть</CloseButton>
        {children}
      </ModalCard>
    </>
  );
};

export default Modal;
