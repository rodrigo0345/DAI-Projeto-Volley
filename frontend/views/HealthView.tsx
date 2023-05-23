import ModalBox from 'Frontend/components/modalBox/ModalBox';
import { UserContext } from 'Frontend/contexts/UserContext';

import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import React, { useContext } from 'react';

export default function HealthView() {
  const { user, logout } = useContext(UserContext);

  /* const [appointments, setAppointments] = React.useState<
    (AppointmentType | undefined)[] | undefined
  >(undefined);

  
  const [createAppointment, setCreateAppointment] = React.useState<
    (Appointment | undefined)[] | undefined
  >(undefined); */

  const [appointmentModal, setAppointmentModal] =
    React.useState<boolean>(false);

  return (
    <div className='min-h-screen flex justify-center items-center relative z-10 bg-white shadow-lg'>
      {user?.role === Roles.USER && (
        <div className='grid grid-rows-4 grid-cols-4 pt-44 m-auto gap-10'>
          <div className='bg-gray-200 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg row-span-3 col-span-2 p-4'>
            <h1 className='text-lg'>Próxima consulta</h1>
          </div>

          <div
            className='bg-gray-200 h-44 w-44 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg p-4'
            onClick={() => {
              setAppointmentModal(true);
            }}
          >
            <h1 className='text-lg'>Marcar consulta</h1>
            <ModalBox
              openModal={appointmentModal}
              setOpenModal={setAppointmentModal}
              title='Marcar consulta'
            >
              <div></div>
            </ModalBox>
          </div>
          <div className='bg-gray-200 h-44 w-44 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg'></div>
          <div className='bg-gray-200 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg row-span-2 col-span-2 p-4'>
            <h1 className='text-lg'>Performance</h1>
          </div>
        </div>
      )}
      {user?.role === Roles.MANAGER && (
        <div className='grid grid-rows-4 grid-cols-4 pt-44 m-auto gap-10'>
          <div className='bg-gray-200 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg row-span-3 col-span-2 p-4'>
            <h1 className='text-lg'>Próxima consulta</h1>
          </div>
          <div className='bg-gray-200 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg row-span-2 col-span-2 p-4'>
            <h1 className='text-lg'>Performance</h1>
          </div>
          <div className='bg-gray-200 h-44 w-44 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg'></div>
          <div className='bg-gray-200 h-44 w-44 shadow-lg transition-all hover:shadow-yellow-400/60 shadow-black/40 rounded-lg'></div>
        </div>
      )}
    </div>
  );
}
