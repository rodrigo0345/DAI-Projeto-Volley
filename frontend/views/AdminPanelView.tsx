import { UserContext } from 'Frontend/contexts/UserContext';
import { signup } from 'Frontend/generated/AuthenticationController';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { useContext, useRef, useState } from 'react';
import { IoIosLogOut, IoMdSettings } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';

enum Menu {
  USERS = 'USERS',
  CHAT = 'CHAT',
}

export default function AdminPanelView() {
  const [menu, setMenu] = useState<Menu>(Menu.USERS);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLInputElement>(null);
  const { user } = useContext(UserContext);

  async function onSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    const firstnameValue = firstname.current?.value;
    const lastnameValue = lastname.current?.value;
    const roleValue = role.current?.value;

    const register: RegisterRequest = {
      email: emailValue,
      password: passwordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
    };

    if (!user) {
      return;
    }

    try {
      let resultSignup = await signup(user, register);
      console.log({ resultSignup });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className='min-h-screen h-screen w-full relative flex'>
      <aside className='sticky h-full w-1/5 flex flex-col pt-44 pb-20 px-16'>
        <ul className='flex flex-col gap-6 flex-1'>
          <li
            onClick={() => setMenu(Menu.USERS)}
            className={
              (menu === Menu.USERS
                ? 'bg-black shadow-md '
                : 'hover:bg-gray-200/40 ') +
              ' px-4 py-2 rounded-xl flex items-center justify-start gap-3 cursor-pointer '
            }
          >
            <RiUserSettingsFill
              color={menu === Menu.USERS ? 'white' : 'gray'}
            ></RiUserSettingsFill>
            <p
              className={
                (menu === Menu.USERS ? 'text-white' : 'text-gray-500') +
                ' font-semibold'
              }
            >
              Utilizadores
            </p>
          </li>
          <li
            onClick={() => setMenu(Menu.CHAT)}
            className={
              (menu === Menu.CHAT
                ? 'bg-black shadow-md '
                : 'hover:bg-gray-200/40 ') +
              ' px-4 py-2 rounded-xl flex items-center justify-start gap-3 cursor-pointer '
            }
          >
            <RiUserSettingsFill
              color={menu === Menu.CHAT ? 'white' : 'gray'}
            ></RiUserSettingsFill>
            <p
              className={
                (menu === Menu.CHAT ? 'text-white' : 'text-gray-500') +
                ' font-semibold'
              }
            >
              Chat
            </p>
          </li>
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
            <button className=' p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100'>
              <IoIosLogOut />
            </button>
          </div>
        </div>
      </aside>
      <div id='content' className='flex-1 pr-28 relative'>
        {menu === Menu.USERS && (
          <header className='sticky pt-40 flex items-start justify-between'>
            <div className='flex flex-col justify-start'>
              <h1 className='text-3xl font-bold mb-4 mt-0'>Utilizadores</h1>
              <h3 className='m-0 text-gray-400 font-normal'>
                Informação dos utilizadores
              </h3>
            </div>
            <div className='flex  justify-center gap-4 h-full'>
              <button className=' p-2 rounded-sm outline-gray-300/70 outline outline-1 w-10 h-10 flex items-center justify-center hover:bg-gray-100'>
                <FaSearch />
              </button>
              <button className=' p-2 rounded-md outline-gray-300/70 outline outline-1 h-10 flex items-center justify-center hover:bg-yellow-600 px-4 bg-yellow-500'>
                <h4 className='m-0 text-white'>Adicionar</h4>
              </button>
            </div>
          </header>
        )}
      </div>
    </main>
  );
}
