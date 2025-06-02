import { useState } from 'react';

const useConfirmationPopup = () => {
  const [modal, setModal] = useState(false);
  const handleCloseModal = () => {
    setModal(false);
  };
  const handleOpenModal = () => {
    setModal(true);
  };
  return { handleCloseModal, handleOpenModal, modal };
};

export default useConfirmationPopup;
