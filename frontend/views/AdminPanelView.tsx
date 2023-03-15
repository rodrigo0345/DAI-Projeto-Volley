import { UserContext } from 'Frontend/contexts/UserContext';
import { signup } from 'Frontend/generated/AuthenticationController';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { useContext, useRef, useState } from 'react';
import { RiUserSettingsFill } from 'react-icons/ri';

enum Menu {
  USERS = 'USERS',
  CHAT = 'CHAT',
}

export default function AdminPanelView() {
  const [menu, setMenu] = useState<Menu>();
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
      <aside className='h-full w-1/5 flex flex-col py-44 px-16'>
        <div>
          <ul className='flex flex-col gap-6'>
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
        </div>
      </aside>
    </main>
  );
}
