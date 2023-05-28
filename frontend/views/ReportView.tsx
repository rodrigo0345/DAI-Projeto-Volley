import ReportCard from 'Frontend/components/cards/ReportCard';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { UserContext } from 'Frontend/contexts/UserContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef } from 'react';
import { CustomScrollbar } from './AdminPanelView';
import { set } from 'date-fns';
import { toast } from 'react-toastify';
import { createReport, findAll } from 'Frontend/generated/ReportController';
import Report from 'Frontend/generated/com/example/application/model/Report';
import ReportType from 'Frontend/generated/com/example/application/controller/Reports/ReportType';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import { findAll as findAllTeams } from 'Frontend/generated/TeamController';

export default function ReportView() {
  const { user, logout } = useContext(UserContext);
  const [newReport, setNewReport] = React.useState(false);
  const [reports, setReports] = React.useState<Report[]>([]);
  const [teams, setTeams] = React.useState<(Team | undefined)[] | undefined>(
    []
  );

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
            onDelete={deleteReport}
            user={user}
            reportSubject={mappedReport}
            key={mappedReport?.id}
          />
        );
      });
  }

  const report = {
    imagem: React.useRef<HTMLInputElement>(null),
    type: React.useRef<HTMLSelectElement>(null),
    team: React.useRef<HTMLSelectElement>(null),
  };

  const reportTypeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const getReports = async () => {
      let result;

      try {
        result = await findAll();
      } catch (e) {
        toast.error('Erro ao obter relatórios');
        return;
      }

      if (result?.body.error) {
        toast.error(result?.body.error);
        return;
      }

      setReports(result?.body?.success || []);
    };

    getReports();

    const getTeams = async () => {
      let result;

      try {
        result = await findAllTeams();
      } catch (e) {
        toast.error('Erro ao obter equipas');
        return;
      }
      setTeams(result || []);
    };

    getTeams();
  }, [user]);

  async function createNewReport() {
    const imagem = report.imagem.current?.files?.[0];
    const type = report.type.current?.value;
    const teamId = report.team.current?.value;

    if (!imagem || !type) {
      toast.error('Preencha todos os campos');
      return;
    }

    // create report
    let result: ResponseEntity | undefined = undefined;

    // Read the file and convert it to a byte array
    const buffer = await imagem?.arrayBuffer();

    try {
      result = await createReport(
        ReportType[type as keyof typeof ReportType],
        Number(teamId),
        [...new Int8Array(buffer ?? new ArrayBuffer(0))]
      );
    } catch (e) {
      toast.error('Erro ao criar relatório');
      return;
    }

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Relatório criado com sucesso');
    setNewReport(false);
    window.location.reload();
  }

  // TODO: delete report (backend)
  async function deleteReport(id: number) {
    // delete report
    let result: ResponseType | undefined = undefined;

    try {
      //result = await deleteReport(id);
    } catch (e) {
      toast.error('Erro ao eliminar relatório');
      return;
    }

    /* if (result?.body.error) {
      toast.error('Erro ao eliminar relatório');
      return;
    } */

    toast.success('Relatório eliminado com sucesso');
    window.location.reload();
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
                ref={report.type}
                className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
              >
                {Object.keys(ReportType)
                  .filter((k) => isNaN(Number(k)))
                  ?.map((type) => (
                    <option value={type}>{type.toString()}</option>
                  ))}
              </select>
            </div>

            <fieldset className='mb-4 flex flex-col w-full'>
              <label
                htmlFor=''
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
              >
                Equipa
              </label>
              <select
                ref={report.team}
                className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
              >
                {teams?.map((team) => (
                  <option value={team?.id}>{team?.name?.toString()}</option>
                ))}
              </select>
            </fieldset>
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
                createNewReport();
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
              {displayReportBy(ReportType.JOGO.toString())}
            </CustomScrollbar>
          </div>
          <div className='w-full flex flex-col justify-start h-96'>
            <h1 className='text-xl'>Relatórios de treinos</h1>
            <CustomScrollbar className='flex overflow-x-auto gap-4'>
              {displayReportBy(ReportType.TREINO.toString())}
            </CustomScrollbar>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
