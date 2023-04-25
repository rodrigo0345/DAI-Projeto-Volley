import { Switch } from '@mantine/core';
import logo from 'Frontend/assets/images/Logo-512x512-1.png';
import { ThemeContext } from 'Frontend/contexts/themeContext';
import { ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { MdOutlineNightsStay } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import MainButton from '../buttons/MainButton';
import { UserContext } from 'Frontend/contexts/UserContext';
import { Link, Navigate, redirect, useLocation } from 'react-router-dom';
import * as HoverCard from '@radix-ui/react-hover-card';

export default function mainHeader() {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [enabledDarkMode, setEnabledDarkMode] = useState<boolean>(
    theme?.theme === 'dark'
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  function switchTheme(e: any) {
    // empty bc of changes
  }

  function toggleModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setOpenModal((prev) => !prev);
  }

  return (
    <div className='header z-50 flex  items-center justify-around bg-transparent w-full h-24 fixed px-6'>
      <div className='flex items-center bg-transparent w-full px-4 gap-4'>
        <div className='h-10 flex'>
          <a href='/dashboard'>
            <img src={logo} alt='' className='h-11 w-11' />
          </a>
        </div>
        <div className='hidden sm:!block'>
          <ul className='flex gap-4'>
            {location.pathname === '/' && (
              <>
                <li className='font-semibold  text-md relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:dark:bg-gray-200/60 before:bg-gray-700/60 before:bottom-0 before:transition-all hover:before:translate-y-2 focus:before:translate-y-2 cursor-pointer'>
                  <a
                    href='#funcionalidades'
                    className='dark:text-gray-100 text-gray-800 hover:no-underline'
                  >
                    Funcionalidades
                  </a>
                </li>
                <li className='font-semibold text-md relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:dark:bg-gray-200/60 before:bg-gray-700/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer'>
                  <a
                    href='#sobrenos'
                    className='dark:text-gray-100 text-gray-800 hover:no-underline'
                  >
                    Sobre nós
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <aside className='relative px-4 sm:flex-row-reverse items-center gap-4 h-12 flex'>
        {user ? (
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <a
                className='cursor-pointer flex items-center gap-2 justify-center bg-gradient-to-r from-yellow-400 to-yellow-300/90 rounded-lg shadow-lg px-4 py-0 no-underline hover:no-underline h-10'
                href={'profiles/' + user?.id}
              >
                <h2 className='text-lg text-gray-100 m-0 font-semibold decoration-none p-0 '>
                  {user.firstname}
                </h2>
              </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className='z-50 data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all'
                sideOffset={5}
              >
                <div className='flex flex-col gap-[7px] z-50'>
                  <div className='flex gap-4 items-center'>
                    <img
                      className='block h-[60px] w-[60px] rounded-full object-contain'
                      src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3214763/user-minus-icon-md.png'
                      alt='Radix UI'
                    />
                    <div>
                      <div className='text-mauve12 m-0 text-[15px] font-medium leading-[1.5]'>
                        {user.firstname + ' ' + user.lastname}
                      </div>
                      <div className='text-mauve10 m-0 text-[15px] leading-[1.5]'>
                        {'@' + user.role?.toLocaleLowerCase()}
                      </div>
                    </div>
                  </div>
                  <div className='text-mauve12 m-0 text-[15px] leading-[1.5]'>
                    Email:{' '}
                    <span className='text-mauve10 '>{' ' + user.email}</span>
                  </div>
                </div>

                <HoverCard.Arrow className='fill-white' />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        ) : (
          <MainButton href='/login' className='hidden'>
            Começa já
          </MainButton>
        )}
        <div
          onClick={toggleModal}
          className='h-full flex items-center sm:hidden dark:text-white'
        >
          <RxHamburgerMenu size={25} color='black'></RxHamburgerMenu>
        </div>
      </aside>

      {/*Modal for mobile*/}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            id='modal'
            className=' sm:hidden fixed top-0 left-0 h-screen w-screen z-10 flex justify-end'
          >
            <div
              className='bg-zinc-700/75 flex-1'
              onClick={() => {
                setOpenModal(false);
              }}
            ></div>
            <motion.div
              onClick={(e) => {
                e.stopPropagation;
              }}
              className='flex flex-col absolute right-0 top-0 h-full bg-zinc-100 dark:bg-zinc-700 w-3/4 opacity-100 z-20 p-3 translate-x-96'
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.2 }}
            >
              <div className='px-4 py-2 flex items-center justify-between'>
                <h3 className='font-semibold text-xl dark:text-white'>
                  Mobile Menu
                </h3>
                <IoClose
                  color={theme?.theme === 'light' ? '' : 'white'}
                  size={30}
                  onClick={() => {
                    setOpenModal(false);
                  }}
                ></IoClose>
              </div>
              <ul className='mt-5 flex flex-col gap-4'>
                <li className='flex justify-between items-center gap-3 outline outline-1 outline-yellow-500 rounded-md p-3'>
                  <label
                    htmlFor='theme-switch'
                    className='text-zinc-800 dark:text-white'
                  >
                    Dark mode
                  </label>
                  <Switch
                    checked={enabledDarkMode}
                    id='theme-switch'
                    onChange={switchTheme}
                    color='yellow'
                  />
                </li>
                <li
                  className='flex justify-between items-center gap-3 outline outline-1 outline-yellow-500 rounded-md p-3 dark:bg-zinc-800/20'
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  <label className='text-zinc-800 dark:text-white'>Login</label>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
