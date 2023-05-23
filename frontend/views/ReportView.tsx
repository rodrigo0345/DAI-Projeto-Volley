import ReportCard from 'Frontend/components/cards/ReportCard';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { UserContext } from 'Frontend/contexts/UserContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef } from 'react';
import { CustomScrollbar } from './AdminPanelView';

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

  enum ReportType {
    Jogo,
    Treino,
  }
  const reportTypeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {})();

    reports.push({
      id: 1,
      report: 'Relatório de treino',
      type: ReportType.Treino.toString(),
    });
    reports.push({
      id: 1,
      report: 'Relatório de treino',
      type: ReportType.Treino.toString(),
    });
    reports.push({
      id: 1,
      report: 'Relatório de treino',
      type: ReportType.Treino.toString(),
    });
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
                Equipa
              </label>
              <select
                ref={reportTypeRef}
                className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
              >
                {Object.values(ReportType)?.map((type) => (
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
            <h1 className='text-xl'>Relatório de jogos</h1>
            <CustomScrollbar>
              {displayReportBy(ReportType.Jogo.toString())}
            </CustomScrollbar>
          </div>
          <div className='w-full flex flex-col justify-start h-96'>
            <h1 className='text-xl'>Relatório de treinos</h1>
            <CustomScrollbar className='flex overflow-x-auto gap-4'>
              {displayReportBy(ReportType.Treino.toString())}
            </CustomScrollbar>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
