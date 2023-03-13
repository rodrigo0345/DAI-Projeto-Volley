import { Switch } from '@mantine/core';
import logo from 'Frontend/assets/images/Logo-512x512-1.png';
import { ThemeContext } from 'Frontend/contexts/themeContext';
import { useContext, useState } from 'react';
import { MdOutlineNightsStay } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import MainButton from '../buttons/MainButton';
import { UserContext } from 'Frontend/contexts/UserContext';
import { Link, Navigate, redirect, useLocation } from 'react-router-dom';

export default function mainHeader() {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [enabledDarkMode, setEnabledDarkMode] = useState<boolean>(
    theme?.theme === 'dark'
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  function switchTheme(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!enabledDarkMode) {
      theme?.enableDarkMode();
    } else {
      theme?.enableLightMode();
    }

    setEnabledDarkMode((prev) => !prev);
  }

  function toggleModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setOpenModal((prev) => !prev);
  }

  return (
    <div className='z-50 flex  items-center justify-around bg-zinc-800/20 w-full h-24 fixed px-6 backdrop-blur-sm'>
      <div className='flex items-center bg-transparent w-full px-4 gap-4'>
        <div className='h-10 flex'>
          <a href='/'>
            <img src={logo} alt='' className='h-full' />
          </a>
        </div>
        <div className='hidden sm:!block'>
          <ul className='flex gap-4'>
            {location.pathname === '/' && (
              <>
                <li className='font-semibold  text-md relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:dark:bg-gray-200/60 before:bg-gray-700/60 before:bottom-0 before:transition-all hover:before:translate-y-2 focus:before:translate-y-2 cursor-pointer'>
                  <a
                    href=''
                    className='dark:text-gray-100 text-gray-800 hover:no-underline'
                  >
                    Funcionalidades
                  </a>
                </li>
                <li className='font-semibold text-md relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:dark:bg-gray-200/60 before:bg-gray-700/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer'>
                  <a
                    href=''
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
      <aside className='relative px-4 flex-row-reverse items-center gap-4 h-12 flex'>
        {user ? (
          <div className='cursor-pointer hidden md:!block'>
            {user.firstname}
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <MainButton href='/login' className='hidden'>
            Começa já
          </MainButton>
        )}

        <div className='relative items-center hidden sm:!flex'>
          <button
            className={`flex items-center justify-center cursor-pointer transition-all bg-transparen dark:text-gray-100 text-gray-800 font-bold rounded-md hover:no-underline text-l h-full w-12 after:content-['Tema'] after:absolute after:top-0 after:left-0 after:transform after:text-base after:font-normal after:text-gray-800 after:dark:text-gray-100 after:transition-all after:duration-300 after:-z-10 hover:after:-translate-x-full hover:after:opacity-100 after:opacity-0`}
            onClick={switchTheme}
            aria-label='Switch theme'
          >
            {enabledDarkMode ? (
              <MdOutlineNightsStay size={20} />
            ) : (
              <WiDaySunny size={25} />
            )}
          </button>
        </div>

        <div
          onClick={toggleModal}
          className='h-full flex items-center sm:hidden dark:text-white'
        >
          <RxHamburgerMenu size={25}></RxHamburgerMenu>
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
