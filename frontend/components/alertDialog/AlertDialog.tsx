import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export default function AlertDialogs({
  children,
  customMessage,
  customFunction,
}: {
  children: React.ReactNode;
  customMessage?: string;
  customFunction?: () => void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal className='z-50'>
        <AlertDialog.Overlay className='bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-50' />
        <AlertDialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50'>
          <AlertDialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
            Tem a certeza?
          </AlertDialog.Title>
          <AlertDialog.Description className='text-mauve11 mt-4 mb-5 text-[15px] leading-normal'>
            {customMessage}
          </AlertDialog.Description>
          <div className='flex justify-end gap-[25px]'>
            <AlertDialog.Cancel asChild>
              <button className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className='text-red-800 bg-red-400 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] z-50'
                onClick={() => {
                  if (customFunction) customFunction();
                }}
              >
                Sim
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
