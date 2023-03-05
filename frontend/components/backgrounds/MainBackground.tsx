import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function mainBackground() {
  useEffect(() => {});

  return (
    <div className='absolute top-0 left-0 w-screen h-screen dark:bg-zinc-800 bg-gray-600'>
      <div className='h-full w-full absolute bg-gradient-to-r from-white/30 to-white/90 dark:from-black/30 dark:to-gray-200/10 top-0 left-0 backdrop-blur-xl'></div>
    </div>
  );
}
