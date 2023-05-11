import { useDisclosure } from '@mantine/hooks';
import { UserContext } from 'Frontend/contexts/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Group, Button, Autocomplete } from '@mantine/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Crud } from '@hilla/react-components/Crud';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { findAll, findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import {
  createTeamWithAdmin,
  createTeamWithManager,
  getPlayersWithoutTeam,
  isPlayerInTeam,
} from 'Frontend/generated/TeamController';
import Escalao from 'Frontend/generated/com/example/application/model/Team/Escalao';
import { toast } from 'react-toastify';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import Team from 'Frontend/generated/com/example/application/model/Team/Team';

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
];

export default function TeamView() {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [opened, setOpen] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [rows, setRows] = useState<readonly any[]>();
  const [usersSelected, setUsersSelected] = useState<number[]>([]);
  const [managers, setManagers] = useState<(LoginUser | undefined)[]>([]);
  const [teams, setTeams] = useState<Team[]>();

  const teamNameRef = React.useRef<HTMLInputElement>(null);
  const escalaoRef = React.useRef<HTMLInputElement>(null);
  const managerRef = React.useRef<HTMLInputElement>(null);

  async function createTeam() {
    const escalao = escalaoRef.current?.value;
    const teamName = teamNameRef.current?.value;
    const manager = managerRef.current?.value;
    const playersSelected = usersSelected;

    if (teamName === undefined || teamName.trim() === '') {
      teamNameRef.current?.focus();
      toast.error('Nome da equipa não pode estar vazio');
      return;
    }

    if (escalao === undefined) {
      escalaoRef.current?.focus();
      toast.error('Escalão não pode estar vazio');
      return;
    }

    // todo: criar equipa
    let result: ResponseEntity | undefined = undefined;

    console.log(usersSelected, escalao, teamName);
    try {
      result = await createTeamWithAdmin(
        user,
        usersSelected,
        escalao,
        teamName
      );
    } catch (e: any) {
      toast.error(e.message);
      return;
    }

    console.log(result);

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success(result?.body.success);
    setOpen(false);
  }

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'ADMIN') setIsAdmin(true);
    const loadPlayers = async () => {
      const players = await getPlayersWithoutTeam();
      setRows(
        players?.body.success.map((user: LoginUser) => {
          return {
            id: user.id,
            lastName: user.lastname,
            firstName: user.firstname,
            age: user.age,
          };
        })
      );
    };
    loadPlayers();

    const loadManagers = async () => {
      const managers = (await findAll()).body.success.filter(
        (user: LoginUser) => user?.role?.toUpperCase() === Roles.MANAGER
      );
      setManagers(managers);
    };
    loadManagers();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center z-10 bg-white relative shadow-lg'>
      <ModalBox title='Criar equipa' openModal={opened} setOpenModal={setOpen}>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Nome da equipa*
          </label>
          <input
            type='text'
            ref={teamNameRef}
            className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Escalão*
          </label>
          <Autocomplete
            ref={escalaoRef}
            placeholder='Escalão'
            withAsterisk
            radius='lg'
            data={Object.values(Escalao)}
            className='rounded-md'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Treinador
          </label>
          <Autocomplete
            ref={managerRef}
            placeholder='Treinador'
            radius='lg'
            data={managers.map(
              (manager) => manager?.firstname + ' ' + manager?.lastname
            )}
            className='rounded-md'
          />
        </div>

        <div className='mb-4 flex flex-col'>
          <label htmlFor='' className='text-sm text-gray-500'>
            Filtrar utilizadores
          </label>
          <input
            type='text'
            onChange={(e) => {
              setFilterByName(e.target.value);
            }}
            className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
          />
        </div>

        <DataGrid
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
        />

        <button
          className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
          onClick={() => {
            createTeam();
          }}
        >
          Criar
        </button>
      </ModalBox>

      <Group position='center'>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className='
         bg-zinc-200 p-2 rounded-md hover:bg-zinc-300
        '
        >
          Criar Equipa
        </button>
      </Group>
    </div>
  );
}
