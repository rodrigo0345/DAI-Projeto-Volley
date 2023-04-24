import { useDisclosure } from '@mantine/hooks';
import { UserContext } from 'Frontend/contexts/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const rows = [
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
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'ADMIN') setIsAdmin(true);
  }, []);
  return (
    <div className='min-h-screen flex items-center justify-center z-10 bg-white relative shadow-lg'>
      <Modal
        opened={opened}
        onClose={close}
        title='Criar equipa'
        centered
        className=''
      >
        {/* Modal content */}
        <DataGrid rows={rows} columns={columns} checkboxSelection />

        <button className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-2 rounded-md'>
          Criar
        </button>
      </Modal>

      <Group position='center'>
        <button
          onClick={open}
          className='
         bg-zinc-200 p-2 rounded-md hover:bg-zinc-300
        '
        >
          Open centered Modal
        </button>
      </Group>
    </div>
  );
}
