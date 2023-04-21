import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export default function ModalBox({
  openModal,
  setOpenModal,
  children,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          id='modal'
          className='fixed top-0 left-0 h-screen w-screen z-40 flex'
        >
          <div
            className='bg-zinc-700/75 flex-1'
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <div className='flex flex-col'>
            <div
              className='bg-zinc-700/75 flex-1'
              onClick={() => {
                setOpenModal(false);
              }}
            ></div>
            {children}
            <div
              className='bg-zinc-700/75 flex-1'
              onClick={() => {
                setOpenModal(false);
              }}
            ></div>
          </div>
          <div
            className='bg-zinc-700/75 flex-1'
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
