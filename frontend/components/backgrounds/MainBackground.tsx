import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function mainBackground({
  children,
}: {
  children: JSX.Element;
}) {
  useEffect(() => {});

  return (
    <div className='w-screen min-h-screen dark:bg-zinc-800 bg-gray-600'>
      <div className='min-h-screen w-full relative bg-gradient-to-r from-white/30 to-white/90 dark:from-black/30 dark:to-gray-200/10 top-0 left-0 backdrop-blur-xl'>
        {children}
      </div>
    </div>
  );
}
