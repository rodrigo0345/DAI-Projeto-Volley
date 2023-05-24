import React from 'react';
import ModalBox from './ModalBox';

export default function ModalInfo({
  activator,
  content,
  children,
  onSubmit,
}: {
  activator: { openModal: boolean; setOpenModal: any };
  content: {
    title: string;
    buttonMsg: string;
    children: Array<{
      variable: string;
      html: React.ReactNode;
    }>;
  };
  children: React.ReactNode;
  onSubmit: () => void;
}): JSX.Element {
  return (
    <ModalBox
      title={content.title}
      openModal={activator.openModal}
      setOpenModal={activator.setOpenModal}
    >
      {content.children.map((child) => {
        return child.html;
      })}
      {children}
      <button
        className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
        onClick={() => {
          onSubmit();
        }}
      >
        {content.buttonMsg}
      </button>
    </ModalBox>
  );
}
