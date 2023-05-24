import ReportCard from 'Frontend/components/cards/ReportCard';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { UserContext } from 'Frontend/contexts/UserContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef } from 'react';
import { CustomScrollbar } from './AdminPanelView';
import { set } from 'date-fns';

export enum ReportType {
  Jogo,
  Treino,
}

export default function ReportView() {
  const { user, logout } = useContext(UserContext);
  const [newReport, setNewReport] = React.useState(false);
  const [reports, setReports] = React.useState<
    { id: number; report: any; type: string }[]
  >([]);

  function displayReportBy(type: string) {
    if (reports.length === 0) {
      return [
        <p className='text-center text-gray-500'>
          Nenhum utilizador encontrado
        </p>,
      ];
    }
    return reports
      .filter((report) => report.type === type)
      .map((mappedReport) => {
        return (
          <ReportCard
            user={user}
            reportSubject={mappedReport}
            key={mappedReport?.id}
          />
        );
      });
  }

  const report = {
    imagem: React.useRef<HTMLInputElement>(null),
  };

  const reportTypeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      // get reports
    })();

    setReports([
      {
        id: 1,
        report: 'Relatório de treino',
        type: ReportType.Jogo.toString(),
      },
      {
        id: 1,
        report: 'Relatório de treino',
        type: ReportType.Treino.toString(),
      },
      {
        id: 1,
        report: 'Relatório de treino',
        type: ReportType.Treino.toString(),
      },
    ]);
  }, [user]);

  async function createReport() {
    const imagem = report.imagem.current?.value;
  }

  return (
    <motion.div
      layout
      className='min-h-screen flex z-10 bg-white relative shadow-lg w-full'
    >
      <div
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-yellow-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className='flex flex-col items-center flex-wrap w-full pt-44'>
        <ModalBox openModal={newReport} setOpenModal={setNewReport}>
          <div className='flex flex-col justify-center items-center px-2 pb-8'>
            <h1 className='text-4xl font-bold text-gray-800 m-4'>
              Novo Relatório
            </h1>
            <div className='mb-4 flex flex-col w-full'>
              <label
                htmlFor=''
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              >
                Tipo de relatório
              </label>
              <select
                ref={reportTypeRef}
                className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
              >
                {Object.keys(ReportType)?.map((type) => (
                  <option value={type}>{type.toString()}</option>
                ))}
              </select>
            </div>
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
        </ModalBox>
        <div className='flex  overflow-y-auto justify-around items-center w-full'>
          <h1 className='text-4xl font-bold text-gray-800'>Relatórios</h1>
          <button
            className='bg-gray-100 rounded-md shadow-lg py-1 px-2 hover:bg-gray-200'
            onClick={() => {
              setNewReport(!newReport);
            }}
          >
            Criar relatório
          </button>
        </div>
        <div className='w-2/3 mx-auto flex flex-col justify-start'>
          <div className='w-full flex flex-col justify-start h-96'>
            <h1 className='text-xl'>Relatórios de jogos</h1>
            <CustomScrollbar className='flex overflow-x-auto gap-4'>
              {displayReportBy(ReportType.Jogo.toString())}
            </CustomScrollbar>
          </div>
          <div className='w-full flex flex-col justify-start h-96'>
            <h1 className='text-xl'>Relatórios de treinos</h1>
            <CustomScrollbar className='flex overflow-x-auto gap-4'>
              {displayReportBy(ReportType.Treino.toString())}
            </CustomScrollbar>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
