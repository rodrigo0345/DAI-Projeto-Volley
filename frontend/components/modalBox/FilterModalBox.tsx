import React from 'react';
import ModalBox from './ModalBox';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export default function FilterModalBox<T extends GridValidRowModel>({
  open,
  setOpen,
  filter,
  data,
  setDataSelected,
  header,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filter: (value: string) => void;
  data: T[];
  setDataSelected: React.Dispatch<React.SetStateAction<T[]>>;
  header: GridColDef<T>[];
}) {
  return (
    <ModalBox title='' openModal={open} setOpenModal={setOpen}>
      <div className='mb-4 flex flex-col'>
        <label htmlFor='' className='text-sm text-gray-500'>
          Filtrar utilizadores
        </label>
        <input
          type='text'
          onChange={(e) => {
            filter(e.target.value);
          }}
          className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'
        />
      </div>
      {/* Modal content */}
      <DataGrid
        rows={data}
        rowSelection={true}
        columns={header}
        onRowSelectionModelChange={(e: any) => {
          setDataSelected(e);
        }}
        checkboxSelection
      />

      <button className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'>
        Criar
      </button>
    </ModalBox>
  );
}
