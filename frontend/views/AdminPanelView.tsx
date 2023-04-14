import { UserContext } from 'Frontend/contexts/UserContext';
import { signup } from 'Frontend/generated/AuthenticationController';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers/RegisterRequest';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoIosLogOut, IoMdSettings } from 'react-icons/io';
import { RiAddFill, RiUserSettingsFill } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import UserCard from 'Frontend/components/cards/UserCard';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { UserController } from 'Frontend/generated/endpoints';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { MultiSelect, NativeSelect, Switch } from '@mantine/core';
import { RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import SidePanel from 'Frontend/components/sidePanel/SidePanel';
import SearchUsers from 'Frontend/components/search/SearchUsers';

enum Menu {
  USERS = 'USERS',
  CHAT = 'CHAT',
}

export default function AdminPanelView() {
  const { user, logout } = useContext(UserContext);

  const [menu, setMenu] = useState<Menu>(Menu.USERS);
  const [users, setUsers] = useState<Set<LoginUser | undefined>>(new Set([]));
  const [addUser, setAddUser] = useState(false);
  const [isEncarregadoSelected, setEncarregadoSelected] = useState(false);
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLSelectElement>(null);
  const educandos = useRef<HTMLSelectElement>(null);
  const form = useRef<HTMLFormElement>(null);

  function filterUsersBy(role: string): JSX.Element[] {
    const result = [...users].filter((mappedUser) => {
      return mappedUser?.role === role;
    });

    if (result.length === 0) {
      return [
        <p className='text-center text-gray-500'>
          Nenhum utilizador encontrado
        </p>,
      ];
    }
    return result.map((mappedUser) => {
      return <UserCard user={mappedUser} key={mappedUser?.id} />;
    });
  }

  async function onSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    setIsLoading(true);
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    let passwordConfirmValue = passwordConfirm.current?.value;
    const firstnameValue = firstname.current?.value;
    const lastnameValue = lastname.current?.value;
    const roleValue = role?.current?.value;
    const educandosValue = educandos.current?.value;

    if (!emailValue || !passwordValue || !firstnameValue || !lastnameValue) {
      toast.error('Preencha todos os campos');
      firstname.current?.focus();
      setIsLoading(false);
      return;
    }

    if (passwordValue !== passwordConfirmValue) {
      toast.error('As passwords inseridas não coincidem');
      password.current?.focus();
      setIsLoading(false);
      return;
    }

    let roleString: string | undefined;
    if (roleValue === 'Administrador') {
      roleString = 'ADMIN';
    } else if (roleValue === 'Encarregado') {
      roleString = 'MANAGER';
    } else if (roleValue === 'Educando') {
      roleString = 'USER';
    }

    const register: RegisterRequest = {
      email: emailValue,
      password: passwordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
      roles: roleString,
    };

    if (!user || !user.role?.includes('ADMIN')) {
      toast.error('Não está autenticado');
      setIsLoading(false);
      return;
    }

    let resultSignup: ResponseEntity | undefined;
    try {
      resultSignup = await signup(user, register);
      console.log({ resultSignup });
    } catch (error) {
      toast.error('Erro interno do servidor, por favor tente mais tarde.');
      console.log(error);
      setIsLoading(false);
      return;
    }

    if (resultSignup === undefined) {
      toast.error('Erro interno do servidor');
      setIsLoading(false);
      return;
    }

    if (resultSignup.body.error !== undefined) {
      toast.error(resultSignup.body.error);
      setIsLoading(false);
      return;
    }

    if (resultSignup) toast.success('Utilizador criado com sucesso');
    setUsers((prev) => {
      // provavelmente extramamente ineficiente
      return new Set([...prev, resultSignup?.body.success as LoginUser]);
    });
    form.current?.reset();
    setAddUser(false);
    setIsLoading(false);
  }

  useEffect(() => {
    async function getUsers() {
      try {
        let resultUsers = await UserController.findAll();
        setUsers(new Set(resultUsers));
      } catch (error) {
        console.error({ error });
      }
    }
    getUsers();
  }, []);

  return (
    <main className='min-h-screen max-w-screen relative flex'>
      <SidePanel
        key={user?.id}
        user={user}
        logout={logout}
        content={[
          {
            id: 0,
            icon: (
              <RiUserSettingsFill
                color={menu === Menu.USERS ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Utilizadores',
            link: '/admin/users',
            targetState: Menu.USERS,
          },
          {
            id: 1,
            icon: (
              <RiUserSettingsFill
                color={menu === Menu.CHAT ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Chat',
            link: '/admin/users',
            targetState: Menu.CHAT,
          },
        ]}
      ></SidePanel>
      <div id='content' className='flex flex-1 pr-28 '>
        {menu === Menu.USERS && (
          <div className='flex-1  m-auto relative !max-w-[45em] lg:max-w-[50em] overflow-x-hidden'>
            <div className='flex flex-col gap-4 relative w-full'>
              <header className='flex justify-between items-center pt-28'>
                <h1 className='text-4xl font-bold'>Utilizadores</h1>
                <button
                  className='flex items-center gap-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-200'
                  onClick={() => {
                    setAddUser(true);
                  }}
                >
                  <RiAddFill />
                  <span>Adicionar</span>
                </button>
              </header>
              <div className='flex flex-col gap-4  max-w-[100%] pb-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-1xl font-bold'>Administradores</h2>
                </div>
                <div className='flex flex-row gap-4  w-full h-72 overflow-x-scroll'>
                  {filterUsersBy('ADMIN')}
                </div>
              </div>
              <div className='flex flex-col gap-4  max-w-[100%] pb-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-1xl font-bold'>Treinadores</h2>
                </div>
                <div className='flex flex-row gap-4  w-full h-72 overflow-x-scroll'>
                  {filterUsersBy('MANAGER')}
                </div>
              </div>
              <div className='flex flex-col gap-4  max-w-[100%] pb-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-1xl font-bold'>Atletas</h2>
                </div>
                <div className='flex flex-row gap-4  w-full h-72 overflow-x-scroll'>
                  {filterUsersBy('USERS')}
                </div>
              </div>
              <div className='flex flex-col gap-4  max-w-[100%] pb-6'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-1xl font-bold'>Rece</h2>
                </div>
                <div className='flex flex-row gap-4  w-full h-72 overflow-x-scroll'>
                  {filterUsersBy('')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {addUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            id='modal'
            className=' fixed top-0 left-0 h-screen w-screen z-40 flex'
          >
            <div
              className='bg-zinc-700/75 flex-1'
              onClick={() => {
                setAddUser(false);
              }}
            ></div>
            <motion.form
              onSubmit={onSubmit}
              className='!fixed flex flex-col bg-zinc-100 dark:bg-zinc-700 opacity-100 z-20 p-4 w-[30em] h-[30em] left-1/2 !-translate-x-1/2 top-1/2 -translate-y-1/2 rounded-md gap-4 justify-between px-8 pt-6'
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.2 }}
              ref={form}
            >
              <div className='flex flex-col gap-4'>
                <h1 className='m-0 text-xl'>Adicionar utilizador</h1>
                <div className=''>
                  <label className='m-0 text-sm text-gray-400'>Nome</label>
                  <div className='flex gap-4'>
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1'
                      type='text'
                      placeholder='Primeiro nome'
                      ref={firstname}
                    />
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1'
                      type='text'
                      placeholder='Último nome'
                      name=''
                      ref={lastname}
                    />
                  </div>
                </div>
                <div>
                  <label className='m-0 text-sm text-gray-400'>Email</label>
                  <div className='flex gap-4 w-full'>
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1 w-fit focus:bg-gray-200'
                      type='email'
                      name=''
                      placeholder='Email'
                      ref={email}
                    />
                  </div>
                </div>
                <div>
                  <label className='m-0 text-sm text-gray-400'>Password</label>
                  <div className='flex gap-4 w-full'>
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1 w-fit focus:bg-gray-200'
                      type='password'
                      placeholder='Password'
                      name=''
                      ref={password}
                    />
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1 w-fit focus:bg-gray-200'
                      type='password'
                      placeholder='Confirmar password'
                      name=''
                      ref={passwordConfirm}
                    />
                  </div>
                </div>
                <div>
                  <label className='m-0 text-sm text-gray-400'>Roles</label>
                  <div className='flex gap-4'>
                    <select
                      onChange={(e) => {
                        setEncarregadoSelected(false);
                        if (e.target.value === 'Encarregado') {
                          console.log('encarregado');
                          setEncarregadoSelected(true);
                        }
                      }}
                      ref={role}
                      className='select select-bordered max-w-xs bg-gray-200 px-2 py-1 rounded-md outline-none w-[197px] h-[34px] cursor-pointer'
                    >
                      <option selected>Administrador</option>
                      <option>Treinador</option>
                      <option>Atleta</option>
                      <option>Encarregado</option>
                    </select>
                    {isEncarregadoSelected && (
                      <select
                        placeholder='Encarregado de'
                        className='select select-bordered max-w-xs bg-gray-200 px-2 py-1 rounded-md outline-none w-[197px] h-[34px] disabled:text-gray-500 cursor-pointer'
                        name=''
                        ref={educandos}
                      >
                        <option value='' disabled selected>
                          Encarregado de
                        </option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className='w-full flex gap-4 justify-end'>
                <button
                  onClick={() => {
                    setAddUser(false);
                  }}
                  disabled={isLoading}
                  type='reset'
                  className='bg-gray-600/70 disabled:bg-gray-500/20 disabled:cursor-not-allowed w-20 py-2 text-sm font-semibold rounded-md hover:bg-gray-500/70 text-white'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='bg-yellow-500/70 disabled:bg-yellow-500/20 disabled:cursor-not-allowed w-20 py-2 text-sm font-semibold rounded-md hover:bg-yellow-600/70 text-white'
                  disabled={isLoading}
                >
                  Adicionar
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
