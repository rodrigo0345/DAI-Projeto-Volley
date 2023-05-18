import { Accordion, Autocomplete } from '@mantine/core';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import SidePanel from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { createPractice } from 'Frontend/generated/PracticeController';
import { findAll } from 'Frontend/generated/TeamController';
import Practice from 'Frontend/generated/com/example/application/model/Practice';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { findAll as findAllPractices } from '../generated/PracticeController';
import { format } from 'date-fns';

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

  return (
    <div className='min-h-screen flex flex-col pt-44 justify-start z-10 bg-white relative shadow-lg items-center w-full'>
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
                          return training?.team === team?.name;
                        })
                        .map((training) => (
                          <article className='flex-none odd:bg-yellow-100 bg-gray-100 w-44 h-44 p-1 rounded-md shadow-md'>
                            <h2 className='text-lg mt-2'>
                              Treino em {training?.local}
                            </h2>
                            <p className='text-sm'>
                              Dia{' '}
                              {format(
                                new Date(training?.startDate ?? '24/4/2023'),
                                'dd/MM/yyyy HH:mm'
                              )}{' '}
                              -{' '}
                              {format(
                                new Date(training?.endDate ?? '24/4/2023'),
                                'HH:mm'
                              )}
                            </p>
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
  );
}
