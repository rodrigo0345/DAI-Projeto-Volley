import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import * as React from 'react';
import { IoIosLogOut, IoMdSettings } from 'react-icons/io';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export type AsideContent<T> = {
  id: number;
  icon: JSX.Element;
  text: string;
  link: string;
  // used to place the setter and state of the content
  activator: {
    state: T;
    setter: React.Dispatch<React.SetStateAction<T>>;
  };
  // store the state at which the content is active
  targetState: T;
};

export default function SidePanel({
  user,
  logout,
  content,
}: {
  user: LoginUser | undefined;
  logout: () => void;
  content: AsideContent<any>[];
}) {
  return (
    <>
      <aside className='sticky top-0 h-screen w-1/5 min-w-fit hidden md:!flex flex-col pt-44 pb-20 px-16'>
        <ul className='flex flex-col gap-6 flex-1 min-w-max'>
          {content.map((item) => {
            return (
              <li
                key={item.text}
                onClick={() => item.activator.setter(item.targetState)}
                className={
                  (item.targetState === item.activator.state
                    ? 'bg-black shadow-lg hover:bg-zinc-700/80 '
                    : 'hover:bg-gray-200/40 ') +
                  ' px-4 py-2 rounded-xl flex items-center justify-start gap-3 cursor-pointer min-w-[14em] transition-all'
                }
              >
                {item.icon}
                <p
                  className={
                    (item.targetState === item.activator.state
                      ? 'text-white animate-[pulse_2s_ease-in-out_infinite]'
                      : 'text-gray-500') + ' font-semibold'
                  }
                >
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
        <div className=''>
          <h3 className='font-bold text-center m-0 text-lg my-4'>
            {user?.firstname} {user?.lastname}
          </h3>
          <h4 className='m-0 text-center text-gray-300 text-sm my-4'>
            {user?.email}
          </h4>
          <div className='w-full flex justify-center gap-4 p-4'>
            <button
              className=' p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100'
              onClick={() => {
                window.location.href = '/profiles/' + user?.id;
              }}
            >
              <IoMdSettings size={20} />
            </button>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className='Button violet  p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100 btn cursor-pointer'>
                  <IoIosLogOut />
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className='bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0' />
                <AlertDialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                  <AlertDialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
                    Are you sure?
                  </AlertDialog.Title>
                  <AlertDialog.Description className='text-mauve11 mt-4 mb-5 text-[15px] leading-normal'>
                    This action cannot be undone. You will be logged out of your
                    account.
                  </AlertDialog.Description>
                  <div className='flex justify-end gap-[25px]'>
                    <AlertDialog.Cancel asChild>
                      <button className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        className='text-red-800 bg-red-400 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'
                        onClick={() => {
                          logout();
                        }}
                      >
                        Yes, log out
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </aside>
      {/* for smaller screens */}
      <aside className='w-full z-50 fixed bottom-0 flex md:hidden md:absolute max-h-[4em] mt-32 bg-gradient-to-l from-yellow-300/60 to-yellow-500/80 backdrop-blur-md'>
        <ul className='flex justify-center gap-8 py-2 w-full items-center'>
          {content.map((item) => {
            return (
              <li
                key={item.text}
                onClick={() => item.activator.setter(item.targetState)}
                className={
                  (item.targetState === item.activator.state
                    ? 'bg-black shadow-lg hover:bg-zinc-700/80 '
                    : 'hover:bg-gray-200/40 ') +
                  ' px-4 py-2 rounded-xl flex flex-col items-center justify-start cursor-pointer transition-all h-fit'
                }
              >
                {item.icon}
                {item.targetState === item.activator.state && (
                  <p
                    className={
                      'text-white animate-[pulse_2s_ease-in-out_infinite]'
                    }
                  >
                    {item.text}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
