import { Accordion, Autocomplete } from '@mantine/core';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { UserContext } from 'Frontend/contexts/UserContext';
import { createPractice } from 'Frontend/generated/PracticeController';
import { findAll } from 'Frontend/generated/TeamController';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function TrainingView() {
  const { user } = useContext(UserContext);

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

  useEffect(() => {
    console.log('Constructed');
    (async () => {
      const result = await findAll();

      const team = result?.filter((team) => team?.managerID === user?.id);
      setTeams(team);
    })();

    return () => {
      console.log('Unmounted');
    };
  }, [user]);

  async function createTraining() {
    const local = localRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    let team = teamIDRef.current?.value;

    team = team?.split('id:')[1];
    const teamID = parseInt(team ?? '');

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

    const result = await createPractice(teamID, local, startDate, endDate);

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }
  }

  return (
    <div className='min-h-screen flex flex-col pt-44 justify-start z-10 bg-white relative shadow-lg items-center w-full'>
      <div className='flex justify-between items-center w-full'>
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
              Escalão*
            </label>
            {/* <Autocomplete
              placeholder='Escalão'
              withAsterisk
              radius='lg'
              className='rounded-md'
            /> */}
          </div>

          <div className='mb-4 flex flex-col'>
            <label htmlFor='' className='text-sm text-gray-500'>
              Treinador
            </label>
            {/* <Autocomplete
              placeholder='Treinador'
              radius='lg'
              data={managers.map(
                (manager) =>
                  manager?.firstname +
                  ' ' +
                  manager?.lastname +
                  ' id:' +
                  manager?.id
              )}
              className='rounded-md'
            /> */}
          </div>

          <div className='mb-4 flex flex-col'>
            <label htmlFor='' className='text-sm text-gray-500'>
              Filtrar utilizadores
            </label>
            <input
              type='text'
              onChange={(e) => {}}
              className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
            />
          </div>

          {/* <DataGrid
            rows={
              rows?.filter((value) => {
                if (filterByName === '') return true;
                return (
                  value.firstName?.includes(filterByName) ||
                  value.lastName?.includes(filterByName) ||
                  value.age?.toString().includes(filterByName)
                );
              }) ?? []
            }
            rowSelection={true}
            columns={columns}
            onRowSelectionModelChange={(e: any) => {
              setUsersSelected(e);
            }} 
            checkboxSelection
          />*/}

          <button
            className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
            onClick={() => {}}
          >
            Criar
          </button>
        </ModalBox>
      </div>
      <motion.main layout className='w-[30em]'>
        <Accordion variant='separated' radius='md' defaultValue='customization'>
          {teams?.map((team) => (
            <Accordion.Item value='customization'>
              <Accordion.Control>{team?.name}</Accordion.Control>
              <Accordion.Panel>
                <div></div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </motion.main>
    </div>
  );
}
