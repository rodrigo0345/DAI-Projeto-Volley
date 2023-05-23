import { Accordion, Autocomplete } from '@mantine/core';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import SidePanel from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import {
  createPractice,
  removePractice,
} from 'Frontend/generated/PracticeController';
import { findAll } from 'Frontend/generated/TeamController';
import Practice from 'Frontend/generated/com/example/application/model/Practice';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { findAll as findAllPractices } from '../generated/PracticeController';
import { format } from 'date-fns';
import { RiUserSettingsFill } from 'react-icons/ri';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineDocumentText } from 'react-icons/hi';
import Ata from 'Frontend/components/cards/Ata';

enum Training {
  Main,
  Report,
}

// TODO associar ao backend
export default function TrainingView() {
  const { user, logout } = useContext(UserContext);

  // String local
  const localRef = React.useRef<HTMLInputElement>(null);
  // startDate
  const startDateRef = React.useRef<HTMLInputElement>(null);
  // endDate
  const endDateRef = React.useRef<HTMLInputElement>(null);
  // teamID
  const teamIDRef = React.useRef<HTMLSelectElement>(null);

  const [opened, setOpen] = React.useState(false);
  const [teams, setTeams] = React.useState<(Team | undefined)[] | undefined>(
    undefined
  );
  const [trainings, setTrainings] = React.useState<
    (Practice | undefined)[] | undefined
  >(undefined);
  const [menu, setMenu] = React.useState<Training>(Training.Main);
  const [openAtaModal, setOpenAtaModal] = React.useState(false);

  useEffect(() => {
    (async () => {
      const result = await findAll();

      const team = result?.filter((team) => team?.managerID === user?.id);
      setTeams(team);

      const trainings = await findAllPractices();
      setTrainings(trainings);
    })();
  }, [user]);

  async function createTraining() {
    const local = localRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    const team = teamIDRef.current?.value;
    // parse to number
    const teamID = Number(team ?? '');
    const startDateParsed = startDate?.toString();
    const endDateParsed = endDate?.toString();

    if (!local) {
      toast.error('Local não pode estar vazio');
      localRef.current?.focus();
      return;
    } else if (!startDate) {
      toast.error('Data de inicio não pode estar vazio');
      startDateRef.current?.focus();
      return;
    } else if (!endDate) {
      toast.error('Data de fim não pode estar vazio');
      endDateRef.current?.focus();
      return;
    }

    console.log(teamID, local, startDateParsed, endDateParsed);
    const result = await createPractice(
      teamID,
      local,
      startDateParsed,
      endDateParsed
    );

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Treino criado com sucesso');
    setOpen(false);
    window.location.reload();
  }

  async function deleteTraining(id: number) {
    const result = await removePractice(id, user);

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Treino eliminado com sucesso');
    window.location.reload();
  }

  return (
    <div className='min-h-screen flex justify-start z-10 bg-white relative shadow-lg items-center w-full'>
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
      <SidePanel
        key={user?.id}
        user={user}
        logout={logout}
        content={[
          {
            id: 0,
            icon: (
              <RiUserSettingsFill
                color={menu === Training.Main ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Página principal',
            link: '/admin/users',
            targetState: Training.Main,
          },
          {
            id: 0,
            icon: (
              <HiOutlineDocumentText
                color={menu === Training.Report ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Atas',
            link: '/admin/users',
            targetState: Training.Report,
          },
        ]}
      />
      {menu === Training.Main && (
        <div className='flex flex-col items-center flex-1'>
          <div className='flex justify-around items-center w-full mb-10'>
            <h1 className='pl-10 m-0'>Treinos</h1>
            <button
              onClick={() => {
                if (teams?.length === 0) {
                  toast.error('Não tem equipas para criar treinos');
                  return;
                }
                setOpen(true);
              }}
              className='mr-10
           bg-zinc-200 p-2 rounded-md hover:bg-zinc-300 h-10 shadow-md
          '
            >
              Agendar treino
            </button>
            <ModalBox
              title='Criar treino'
              openModal={opened}
              setOpenModal={setOpen}
            >
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Equipa
                </label>
                <select
                  ref={teamIDRef}
                  className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
                >
                  {teams?.map((team) => (
                    <option value={team?.id}>{team?.name}</option>
                  ))}
                </select>
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Hora e dia de começo
                </label>
                <input
                  type='datetime-local'
                  name='hora de começo'
                  ref={startDateRef}
                />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Hora de fim
                </label>
                <input type='time' name='hora de fim' ref={endDateRef} />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Local
                </label>
                <input type='text' name='local' ref={localRef} />
              </div>
              <button
                className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
                onClick={() => {
                  createTraining();
                }}
              >
                Criar
              </button>
            </ModalBox>
          </div>
          <div className='flex'>
            <motion.main layout className='w-[30em]'>
              <Accordion
                variant='separated'
                radius='md'
                defaultValue='customization'
              >
                {teams?.map((team) => (
                  <Accordion.Item value={String(team?.id) ?? ''}>
                    <Accordion.Control>{team?.name}</Accordion.Control>
                    <Accordion.Panel>
                      <div className='overflow-hidden relative w-full'>
                        <h1 className='text-xl m-4'>Próximos Treinos</h1>
                        <div className='overflow-auto scroll-auto flex gap-4 w-full p-2'>
                          {trainings
                            ?.filter((training) => {
                              return training?.team === team?.id;
                            })
                            .map((training) => (
                              <article className='flex-none odd:bg-yellow-100 bg-gray-100 w-44 h-44 p-1 rounded-md shadow-md'>
                                <h2 className='text-lg mt-2'>
                                  Treino em {training?.local}
                                </h2>
                                <p className='text-sm'>
                                  Dia{' '}
                                  {format(
                                    new Date(
                                      training?.startDate ?? '24/4/2023'
                                    ),
                                    'dd/MM/yyyy HH:mm'
                                  )}{' '}
                                  -{' '}
                                  {format(
                                    new Date(training?.endDate ?? '24/4/2023'),
                                    'HH:mm'
                                  )}
                                </p>
                                <button
                                  className='bg-red-300 p-1 rounded-md hover:bg-red-400 text-red-700'
                                  onClick={(e) => {
                                    deleteTraining(training?.id ?? 0);
                                  }}
                                >
                                  Delete
                                </button>
                              </article>
                            ))}
                        </div>
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.main>
          </div>
        </div>
      )}
      {menu === Training.Report && (
        <div className='flex flex-col items-center flex-1'>
          <div className='flex justify-around items-center w-full mb-10'>
            <h1 className='pl-10 m-0'>Atas</h1>
            <button
              onClick={() => {
                if (teams?.length === 0) {
                  toast.error('Não tem equipas para criar treinos');
                  return;
                }
                setOpenAtaModal(true);
              }}
              className='mr-10
           bg-zinc-200 p-2 rounded-md hover:bg-zinc-300 h-10 shadow-md
          '
            >
              Criar ata
            </button>
            <ModalBox
              title='Criar ata'
              openModal={openAtaModal}
              setOpenModal={setOpenAtaModal}
            >
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Título
                </label>
                <input type='text' placeholder='Título' />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Resumo
                </label>
                <textarea />
              </div>
              <div className='mb-4 flex flex-col'>
                <label htmlFor='' className='text-sm text-gray-500'>
                  Treino a associar
                </label>
                <select
                  ref={teamIDRef}
                  className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
                >
                  {teams?.map((team) => (
                    <option value={team?.id}>{team?.name}</option>
                  ))}
                </select>
              </div>

              <button
                className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
                onClick={() => {
                  createTraining();
                }}
              >
                Criar
              </button>
            </ModalBox>
          </div>

          <div>
            <Ata user={user} reportSubject={{ type: 'Treino' }} key={0}></Ata>
          </div>
        </div>
      )}
    </div>
  );
}
