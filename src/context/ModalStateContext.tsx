'use client'

import { createContext, useState, ReactNode, FC, useCallback, useEffect } from 'react';

interface ModalProps {
  modalOpen: boolean;
  type: 'A' | 'C' | 'L' | 'S';
  // A = Alert(기본알림), C = Confirm 확인여부, S = Setting 팝업,
  changeModalType: (type: ModalProps['type']) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalStateContext = createContext<ModalProps>({
  modalOpen: false,
  type: 'A',
  changeModalType: (type: ModalProps['type']) => {},
  openModal: () => {},
  closeModal: () => {}
});

export const ModalStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalOpen, isModalOpen] = useState<boolean>(false);
  const [type, setType] = useState<ModalProps['type']>('A');

  const changeModalType = (type: ModalProps['type']) => setType(type);
  const openModal   = () => isModalOpen(true);
  const closeModal  = () => isModalOpen(false);

  // if (!isModalLoaded) {
  //   return null;
  // }

  return (
    <ModalStateContext.Provider value={{ modalOpen, type, changeModalType, openModal, closeModal}}>
      {children}
    </ModalStateContext.Provider>
  );
};