import { Switch } from '@mantine/core';
import logo from 'Frontend/assets/images/Logo-512x512-1.png';
import { ThemeContext } from 'Frontend/contexts/themeContext';
import { useContext, useState } from 'react';
import { MdOutlineNightsStay } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';

export default function mainHeader() {
  const [enabledDarkMode, setEnabledDarkMode] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  function switchTheme(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!enabledDarkMode) {
      theme?.enableDarkMode();
    } else {
      theme?.enableLightMode();
    }

    setEnabledDarkMode((prev) => !prev);
  }

  return (
    <div className='z-50 flex  items-center justify-around bg-transparent w-full h-24 fixed px-6 backdrop-blur-sm'>
      <div className='flex items-center bg-transparent w-full px-4 gap-4'>
        <div className='h-10 flex'>
          <a href='https://vitoriasc.pt/' target='_blank'>
            <img src={logo} alt='' className='h-full' />
          </a>
        </div>
        <div>
          <ul className='flex gap-4'>
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
          </ul>
        </div>
      </div>
      <aside className='relative px-4 flex flex-row-reverse items-center gap-4 h-12'>
        <a
          href='/login'
          className='cursor-pointer text-gray-800 bg-transparent outline outline-2 outline-gray-700/60 dark:outline-gray-100/60 hover:outline-yellow-600 w-fit whitespace-nowrap py-2 px-4 dark:text-gray-100 font-semibold  rounded-full hover:no-underline text-md'
        >
          Começa já
        </a>

        <div className='relative flex items-center'>
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
      </aside>
    </div>
  );
}
