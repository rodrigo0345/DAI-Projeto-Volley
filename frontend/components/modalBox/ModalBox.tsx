import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
  const isMobile = useMediaQuery('(max-width: 30em)');
  return (
    <AnimatePresence>
      <Modal
        style={{ minWidth: 'none' }}
        opened={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title={title ?? ''}
        fullScreen={isMobile}
        className='max-w-screen overflow-hidden'
      >
        <div className='w-full'>{children}</div>
      </Modal>
    </AnimatePresence>
  );
}
