import ModalBox from 'Frontend/components/modalBox/ModalBox';
import SidePanel from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';

import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import React, { useContext } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { RiHealthBookLine, RiUserSettingsFill } from 'react-icons/ri';
import { TbHealthRecognition, TbReportSearch } from 'react-icons/tb';

enum AppointmentType {
  Proximas,
  Pendentes,
  Antigas,
  Relatorios,
}

enum Speciality {
  PHYSICAL,
  TECHNICAL,
  PSYCHOLOGICAL,
}

export default function HealthView() {
  const { user, logout } = useContext(UserContext);

  /* const [appointments, setAppointments] = React.useState<
    (AppointmentType | undefined)[] | undefined
  >(undefined);

  
  const [createAppointment, setCreateAppointment] = React.useState<
    (Appointment | undefined)[] | undefined
  >(undefined); */

  const [menu, setMenu] = React.useState<AppointmentType>(
    AppointmentType.Proximas
  );

  const [appointmentModal, setAppointmentModal] =
    React.useState<boolean>(false);

  const [opened, setOpen] = React.useState<boolean>(false);

  return (
    <div className='min-h-screen flex justify-center items-center relative z-10 bg-white shadow-lg'>
      <SidePanel
        key={user?.id}
        user={user}
        logout={logout}
        content={[
          {
            id: 0,
            icon: (
              <TbHealthRecognition
                size={20}
                color={menu === AppointmentType.Proximas ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Próximas consultas',
            link: '/admin/users',
            targetState: AppointmentType.Proximas,
          },
          {
            id: 1,
            icon: (
              <MdOutlineHealthAndSafety
                size={20}
                color={menu === AppointmentType.Pendentes ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Consultas pendentes',
            link: '/admin/users',
            targetState: AppointmentType.Pendentes,
          },
          {
            id: 2,
            icon: (
              <RiHealthBookLine
                size={20}
                color={menu === AppointmentType.Antigas ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Consultas antigas',
            link: '/admin/users',
            targetState: AppointmentType.Antigas,
          },
          {
            id: 3,
            icon: (
              <TbReportSearch
                size={20}
                color={menu === AppointmentType.Relatorios ? 'white' : 'black'}
              />
            ),
            activator: {
              setter: setMenu,
              state: menu,
            },
            text: 'Relatórios consultas',
            link: '/admin/users',
            targetState: AppointmentType.Relatorios,
          },
        ]}
      />
      <div className='flex-1'>
        {menu === AppointmentType.Proximas && (
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-around w-full'>
              <h1 className='text-2xl font-bold text-gray-700'>
                Próximas consultas
              </h1>
              <button
                className='bg-gray-200 py-1 px-2 rounded-md shadow-lg hover:bg-gray-300'
                onClick={() => {
                  setOpen(true);
                }}
              >
                Marcar consulta
              </button>
              <ModalBox
                title='Marcar consulta'
                openModal={opened}
                setOpenModal={setOpen}
              >
                <div className='mb-4 flex flex-col'>
                  <label htmlFor='' className='text-sm text-gray-500'>
                    Especialidade
                  </label>
                  <select className=' ring-0 outline-none border-collapse focus:ring-0 rounded-lg'>
                    {Object.values(Speciality)?.map((s) => (
                      <option value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className='mb-4 flex flex-col'>
                  <label htmlFor='' className='text-sm text-gray-500'>
                    Hora e dia de começo
                  </label>
                  <input type='datetime-local' name='hora de começo' />
                </div>

                <button
                  className='bg-green-400 hover:bg-green-500 p-2 px-4 font-semibold text-white mt-4 rounded-md'
                  onClick={() => {}}
                >
                  Criar
                </button>
              </ModalBox>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
