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
    <div className='flex items-center justify-around bg-transparent w-full h-24 fixed px-6'>
      <div className='flex items-center bg-transparent w-full px-4 gap-4'>
        <div className='h-10 flex hover:scale-125 transition-all'>
          <a href='https://vitoriasc.pt/' target='_blank'>
            <img src={logo} alt='' className='h-full' />
          </a>
        </div>
        <div>
          <ul className='flex gap-4'>
            <li className='font-bold  text-xl relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:bg-yellow-600/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer'>
              <a href='' className='text-gray-100 hover:no-underline'>
                Funcionalidades
              </a>
            </li>
            <li className='font-bold text-xl relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:bg-yellow-600/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer no-underline before:bg-blend-color-dodge'>
              <a href='' className='text-gray-100 hover:no-underline'>
                Sobre nós
              </a>
            </li>
          </ul>
        </div>
      </div>
      <aside className='relative px-4 flex flex-row-reverse items-center gap-4 h-12'>
        <a
          href=''
          className='cursor-pointer text-gray-50 bg-yellow-600/60 hover:bg-yellow-600/80 dark:text-gray-100 font-bold py-2 px-4 rounded-md hover:no-underline text-l h-full'
        >
          Login
        </a>

        <button
          className='flex items-center justify-center cursor-pointer text-gray-50 bg-yellow-600/60 hover:bg-yellow-600/80 dark:text-gray-100 font-bold rounded-md hover:no-underline text-l h-full w-12'
          onClick={switchTheme}
        >
          {enabledDarkMode ? (
            <MdOutlineNightsStay size={20} />
          ) : (
            <WiDaySunny size={25} />
          )}
        </button>
      </aside>
    </div>
  );
}
