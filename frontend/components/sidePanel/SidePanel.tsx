import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import * as React from 'react';
import { IoIosLogOut, IoMdSettings } from 'react-icons/io';

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
    <aside className='sticky top-0 h-screen w-1/5 min-w-fit flex flex-col pt-44 pb-20 px-16'>
      <ul className='flex flex-col gap-6 flex-1 min-w-max'>
        {content.map((item) => {
          return (
            <li
              key={item.text}
              onClick={() => item.activator.setter(item.targetState)}
              className={
                (item.targetState === item.activator.state
                  ? 'bg-black shadow-md '
                  : 'hover:bg-gray-200/40 ') +
                ' px-4 py-2 rounded-xl flex items-center justify-start gap-3 cursor-pointer min-w-[14em]'
              }
            >
              {item.icon}
              <p
                className={
                  (item.targetState === item.activator.state
                    ? 'text-white'
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
          <button className=' p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100'>
            <IoMdSettings size={20} />
          </button>
          <button
            className=' p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100'
            onClick={() => {
              logout();
            }}
          >
            <IoIosLogOut />
          </button>
        </div>
      </div>
    </aside>
  );
}
