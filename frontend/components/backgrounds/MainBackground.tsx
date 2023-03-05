import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function mainBackground() {
  useEffect(() => {});

  return (
    <div className='-z-10 absolute top-0 w-full h-full dark:bg-zinc-800 bg-gray-600'>
      {/*
      <svg
        id='visual'
        viewBox='0 0 900 600'
        width='900'
        height='600'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
      >
        <g transform='translate(35.14400729281391 -43.76270333787923)'>
          <motion.path
            animate={{ rotate: 360, x: 100 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            id='blob1'
            d='M362.3 -413.9C435.3 -370.5 436.8 -223.9 427.8 -101.1C418.9 21.7 399.5 120.6 355.1 211.9C310.6 303.3 241 387 143.3 444.7C45.6 502.4 -80.1 534.1 -197.6 506.9C-315.1 479.8 -424.3 393.9 -471.7 285.2C-519.1 176.5 -504.8 45 -469.5 -70.3C-434.3 -185.6 -378.2 -284.7 -296.4 -326.5C-214.7 -368.4 -107.3 -352.9 18.6 -375.2C144.6 -397.4 289.3 -457.2 362.3 -413.9'
            fill='#facc1f'
          ></motion.path>
        </g>
      </svg>
      */}

      <div className='h-full w-full absolute bg-gradient-to-r from-white/30 to-white/90 dark:from-black/30 dark:to-gray-200/10 top-0 left-0 backdrop-blur-xl'></div>
    </div>
  );
}
