import { Modal } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export default function ModalBox({
  openModal,
  setOpenModal,
  children,
  title,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <AnimatePresence>
      <Modal
        opened={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={title ?? ''}
        centered
        className=''
      >
        {children}
      </Modal>
    </AnimatePresence>
  );
}
