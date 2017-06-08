import React from 'react';
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4000;
  background: rgba(255, 255, 255, 0.2);
`;

export const ModalHeader = styled.div``;
export const ModalBody = styled.div``;

export const ModalContainer = styled.div`

`;

export default function Modal(props) {
  const handleCloseModal = () => {
    const { onCloseModal } = props;

    if (onCloseModal && typeof onCloseModal === 'function') {
      onCloseModal();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>

      </ModalContainer>
    </ModalOverlay>
  );
}
