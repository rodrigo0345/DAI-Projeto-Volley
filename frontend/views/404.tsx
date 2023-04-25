import React from 'react';
import notFound from '../assets/svgs/notFound.svg';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 relative shadow-lg z-10'>
      <div className='text-center'>
        <motion.img
          initial={{ opacity: 0, y: -100, pathLength: 0 }}
          animate={{ opacity: 1, y: 0, pathLength: 1 }}
          src={notFound}
          alt='Não encontrado'
          className='h-24 w-full object-contain object-center'
        />
        <p className='text-base font-semibold text-yellow-400'>404</p>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'
        >
          Página não encontrada
        </motion.h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Pedimos desculpa, mas não foi possível encontrar a página que procura.
        </p>

        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href='/dashboard'
            className='rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
}
