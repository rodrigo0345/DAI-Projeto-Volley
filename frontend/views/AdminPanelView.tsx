import { UserContext } from 'Frontend/contexts/UserContext';
import { signup } from 'Frontend/generated/AuthenticationController';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoIosLogOut, IoMdSettings } from 'react-icons/io';
import { RiUserSettingsFill } from 'react-icons/ri';
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
      toast.error('Erro interno do servidor');
      console.log(error);
      setIsLoading(false);
      return;
    }

    if (resultSignup === undefined) {
      toast.error('Erro interno do servidor');
      setIsLoading(false);
      return;
    }

    if (resultSignup) toast.success('Utilizador criado com sucesso');
    setUsers((prev) => prev.add(resultSignup?.body as LoginUser));
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
    <main className='min-h-screen w-full relative flex'>
      <aside className='sticky top-0 h-screen w-1/5 min-w-fit flex flex-col pt-44 pb-20 px-16'>
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
      <div id='content' className='flex flex-1 pr-28 relative'>
        {menu === Menu.USERS && (
          <div className='flex-1 relative'>
            {' '}
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
                <button
                  className=' p-2 rounded-md outline-gray-300/70 outline outline-1 h-10 flex items-center justify-center hover:bg-yellow-600 px-4 bg-yellow-500'
                  onClick={() => {
                    setAddUser(true);
                  }}
                >
                  <h4 className='m-0 text-white'>Adicionar</h4>
                </button>
              </div>
            </header>
            <div className='flex-1 pt-10 gap-10 flex-wrap flex flex-col pb-8 relative w-full'>
              <div>
                <h3>Administradores</h3>
                <div className='flex gap-4 max-w-98'>
                  {[...users]
                    .filter((mappedUser) => {
                      return mappedUser?.role === 'ADMIN';
                    })
                    .map((mappedUser) => {
                      return (
                        <UserCard user={mappedUser} key={mappedUser?.id} />
                      );
                    })}
                </div>
              </div>
              <div>
                <h3>Treinadores</h3>
                <div className='flex gap-4'>
                  {[...users]
                    .filter((mappedUser) => {
                      return mappedUser?.role === 'MANAGER';
                    })
                    .map((mappedUser) => {
                      return (
                        <UserCard user={mappedUser} key={mappedUser?.id} />
                      );
                    })}
                </div>
              </div>
              <div>
                <h3>Atletas</h3>
                <div className='flex gap-4'>
                  {[...users]
                    .filter((mappedUser) => {
                      return mappedUser?.role === 'USER';
                    })
                    .map((mappedUser) => {
                      return (
                        <UserCard user={mappedUser} key={mappedUser?.id} />
                      );
                    })}
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
              onClick={(e) => {
                e.stopPropagation;
              }}
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
                      id=''
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
                      id=''
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
                      id=''
                      ref={password}
                    />
                    <input
                      className='bg-gray-200 rounded-md outline-0 px-2 py-1 w-fit focus:bg-gray-200'
                      type='password'
                      placeholder='Confirmar password'
                      name=''
                      id=''
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
