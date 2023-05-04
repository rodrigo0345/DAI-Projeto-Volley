import { useDisclosure } from '@mantine/hooks';
import { UserContext } from 'Frontend/contexts/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Crud } from '@hilla/react-components/Crud';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { findAll, findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import {
  getPlayersWithoutTeam,
  isPlayerInTeam,
} from 'Frontend/generated/TeamController';

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

const rowsExample = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function TeamView() {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [opened, setOpen] = useState(false);
  const [filterByName, setFilterByName] = useState('');
  const [rows, setRows] = useState(rowsExample);
  const [usersSelected, setUsersSelected] = useState<number[]>([]);

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
            age: 0,
          };
        })
      );
    };
    loadPlayers();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center z-10 bg-white relative shadow-lg'>
      <ModalBox title='Criar equipa' openModal={opened} setOpenModal={setOpen}>
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
          rows={rows.filter((value) => {
            if (filterByName === '') return true;
            return (
              value.firstName?.includes(filterByName) ||
              value.lastName?.includes(filterByName) ||
              value.age?.toString().includes(filterByName)
            );
          })}
          rowSelection={true}
          columns={columns}
          onRowSelectionModelChange={(e: any) => {
            setUsersSelected(e);
          }}
          checkboxSelection
        />

        <button className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'>
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
