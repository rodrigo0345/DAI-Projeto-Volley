import { UserContext } from 'Frontend/contexts/UserContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';

export default function ReportView() {
  const { user, logout } = useContext(UserContext);

  const report = {
    imagem: React.useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    (async () => {})();
  }, []);

  async function createReport() {
    const imagem = report.imagem.current?.value;
  }

  return (
    <motion.div
      layout
      className='min-h-screen flex z-10 bg-white relative shadow-lg w-full'
    >
      <div className='flex flex-col items-center flex-wrap w-full pt-44'>
        <div className='flex flex-col justify-center items-center border-b border-1 px-2 pb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Novo Relatório</h1>
          <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
            <label
              className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              htmlFor='name'
            >
              Relatório PDF{' '}
            </label>
            <input type='file' accept='pdf/*' ref={report.imagem} />
          </fieldset>
          <button
            className='mt-4 bg-yellow-200 w-20 rounded-md py-1 px-2 font-semibold hover:bg-yellow-300 shadow-lg'
            onClick={() => {
              createReport();
            }}
          >
            Guardar
          </button>
        </div>
        <div className='flex flex-col   overflow-y-auto'>
          <h1 className='text-4xl font-bold text-gray-800'>Relatórios</h1>
        </div>
      </div>
    </motion.div>
  );
}
