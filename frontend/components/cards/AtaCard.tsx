import ReportType from 'Frontend/generated/com/example/application/controller/Reports/ReportType';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';

import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import Report from 'Frontend/generated/com/example/application/model/Report';
import Ata from 'Frontend/generated/com/example/application/model/Ata';

export default function AtaCard({
  user,
  ataSubject,
  onDelete,
}: {
  ataSubject?: Ata;
  user: LoginUser | undefined;
  onDelete?: (id: number) => void;
}) {
  return (
    <div className='cursor-pointer w-60 h-60 overflow-hidden rounded-lg p-2 flex-none py-6 px-3 first:pl-6 last:pr-6 bg-yellow-100 mb-2 mt-2'>
      <div className='flex justify-between'>
        <h1 className='text-xl m-1'>{ataSubject?.title}</h1>
        <span className='h-full flex items-center justify-center'>
          <button className='pl-2 pt-2' title='Apagar'>
            <AiOutlineDelete
              size={20}
              className='hover:text-red-500'
            ></AiOutlineDelete>
          </button>
        </span>
      </div>
    </div>
  );
}
