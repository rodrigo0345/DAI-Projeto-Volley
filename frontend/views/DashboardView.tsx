import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers/RegisterRequest';
import { useContext, useEffect, useRef, useState } from 'react';
import SidePanel, {
  AsideContent,
} from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import CalendarView from 'Frontend/components/calendar/Calendar';
import styled from 'styled-components';
import { RiTeamLine } from 'react-icons/ri';
import { MdOutlineAdminPanelSettings, MdOutlineForum } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { CiStreamOn } from 'react-icons/ci';
import { GiHealthNormal, GiWeightLiftingUp } from 'react-icons/gi';
import { FaVolleyballBall } from 'react-icons/fa';
import { BiFootball } from 'react-icons/bi';
import { GrDocumentText } from 'react-icons/gr';
import { HiOutlineDocumentText } from 'react-icons/hi';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import Scheduler from 'Frontend/components/scheduler/Scheduler';
import { SegmentedControl } from '@mantine/core';

export const Box = styled.article`
  & {
    cursor: pointer;
  }
  &:hover {
    .icon {
      transform: translateX(-1.5rem);
    }
  }
  .icon {
    transition: transform 0.2s ease-in-out;
  }
`;

enum Menu {
  DASHBOARD = 'DASHBOARD',
  CALENDAR = 'CALENDAR',
}

export default function DashboardView() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState<Menu>(Menu.DASHBOARD);
  const [calendarType, setCalendarType] = useState<string>('geral');

  const content: AsideContent<Menu>[] = [
    {
      id: 0,
      text: 'Dashboard',
      icon: (
        <AiOutlineDashboard
          color={menu === Menu.DASHBOARD ? 'white' : 'black'}
          size={25}
        ></AiOutlineDashboard>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.DASHBOARD,
      link: '/dashboard',
    },
    {
      id: 1,
      text: 'Calendário',
      icon: (
        <BsCalendarDate
          color={menu === Menu.CALENDAR ? 'white' : 'black'}
          size={25}
        ></BsCalendarDate>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.CALENDAR,
      link: '/calendar',
    },
    // adicionar novos menus é aqui
  ];

  return (
    <main className='min-h-screen flex flex-col md:!flex-row relative z-10 bg-white shadow-lg'>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <div className='relative flex-1'>
        <div
          className='fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-50'
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
        <img
          src='../assets/svgs/sport.svg'
          alt=''
          className='absolute bottom-1/2 left-10 object-cover opacity-25 bg-fixed translate-y-1/2 hidden md:block'
        />
        {menu === Menu.DASHBOARD && (
          <div className='flex flex-col gap-4 pb-24 pt-28 relative px-4 max-w-[60em] m-auto'>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <div className='w-full max-w-full grid md:!grid-cols-4 sm:!grid-cols-2 grid-cols-1 grid-rows-4 gap-x-4 gap-y-10 self-center'>
              {!(user?.role?.toUpperCase() === Roles.SECCTIONIST) && (
                <Box
                  className='bg-gradient-to-br from-blue-900/100 to-cyan-600/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/team';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Equipa
                  </h2>
                  <p className='text-gray-200'>
                    Descobre tudo sobre a tua equipa!
                  </p>
                  <RiTeamLine
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></RiTeamLine>
                </Box>
              )}
              {user?.role?.toUpperCase() === Roles.MANAGER && (
                <Box
                  className='bg-gradient-to-tl from-purple-500/100 to-purple-800/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/lives';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Lives
                  </h2>
                  <CiStreamOn
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></CiStreamOn>
                </Box>
              )}
              {user?.role?.toUpperCase() === Roles.ADMIN && (
                <Box
                  onClick={() => {
                    window.location.href = '/admin';
                  }}
                  className='bg-gradient-to-br from-zinc-500/100 to-gray-400/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Regulador
                  </h2>
                  <MdOutlineAdminPanelSettings
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></MdOutlineAdminPanelSettings>
                </Box>
              )}

              <Box
                onClick={() => {
                  window.location.href = `/profiles/${user?.id}`;
                }}
                className='bg-gradient-to-br from-orange-500/100 to-orange-400/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
              >
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Perfil
                </h2>
                <CgProfile
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></CgProfile>
              </Box>
              {!(
                user?.role?.toUpperCase() === Roles.ADMIN ||
                user?.role?.toLocaleUpperCase() === Roles.MANAGER
              ) && (
                <Box
                  className='bg-gradient-to-tl from-green-500/100 to-green-800/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/health';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Saúde
                  </h2>
                  <GiHealthNormal
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></GiHealthNormal>
                </Box>
              )}
              <Box
                className='bg-gradient-to-tr from-yellow-300/100 to-yellow-500/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                onClick={() => {
                  window.location.href = '/forum';
                }}
              >
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Fórum
                </h2>
                <p className='text-gray-50'>
                  Comunicar entre todos nunca foi <br /> tão fácil
                </p>
                <MdOutlineForum
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></MdOutlineForum>
              </Box>
              {!(user?.role?.toUpperCase() === Roles.SECCTIONIST) && (
                <Box
                  className='bg-gradient-to-tr from-red-600/100 to-red-500/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/game';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Jogos{' '}
                  </h2>

                  <FaVolleyballBall
                    size={150}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></FaVolleyballBall>
                </Box>
              )}
              {(user?.role?.toUpperCase() === Roles.ADMIN ||
                user?.role?.toUpperCase() === Roles.MANAGER) && (
                <Box
                  className='bg-gradient-to-tr from-pink-600/100 to-pink-500/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/report';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Relatórios{' '}
                  </h2>
                  <HiOutlineDocumentText
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></HiOutlineDocumentText>
                </Box>
              )}
              {!(
                user?.role?.toUpperCase() === Roles.SECCTIONIST ||
                user?.role?.toUpperCase() === Roles.ADMIN
              ) && (
                <Box
                  className='bg-gradient-to-tr from-teal-400/100 to-teal-700/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'
                  onClick={() => {
                    window.location.href = '/training';
                  }}
                >
                  <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                    Treinos
                  </h2>
                  <p className='text-gray-50'>
                    Confere os treinos marcados <br /> da tua equipa
                  </p>
                  <GiWeightLiftingUp
                    size={180}
                    color='#e5e7eb'
                    className='icon absolute -right-10 -bottom-10 '
                  ></GiWeightLiftingUp>
                </Box>
              )}
            </div>
          </div>
        )}
        {menu === Menu.CALENDAR && (
          <div className='flex flex-col gap-4 pt-28 relative w-full'>
            <h1 className='text-3xl font-bold'>Calendário</h1>
            <SegmentedControl
              onChange={(value) => {
                setCalendarType(value);
              }}
              data={[
                { label: 'Geral', value: 'geral' },
                { label: 'Pessoal', value: 'pessoal' },
              ]}
            />
            <CalendarView
              user={user}
              calendarType={calendarType}
            ></CalendarView>
          </div>
        )}
      </div>
    </main>
  );
}
