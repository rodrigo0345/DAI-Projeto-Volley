import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers/RegisterRequest';
import { useContext, useRef, useState } from 'react';
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

const Box = styled.article`
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
    <main className='min-h-screen flex flex-col md:!flex-row relative'>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <div className='relative flex-1'>
        <img
          src='../assets/svgs/sport.svg'
          alt=''
          className='absolute bottom-1/2 left-10 object-cover opacity-25 bg-fixed translate-y-1/2 hidden md:block'
        />
        {menu === Menu.DASHBOARD && (
          <div className='flex flex-col gap-4 pb-24 pt-28 relative px-4 max-w-[60em] m-auto'>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <div className='w-full max-w-full grid md:!grid-cols-4 sm:!grid-cols-2 grid-cols-1 grid-rows-4 gap-x-4 gap-y-10 self-center'>
              <Box className='bg-gradient-to-br from-blue-900/100 to-cyan-600/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
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
              <Box className='bg-gradient-to-tl from-purple-500/100 to-purple-800/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Lives
                </h2>
                <CiStreamOn
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></CiStreamOn>
              </Box>
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
              <Box className='bg-gradient-to-tl from-green-500/100 to-green-800/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Saúde
                </h2>
                <GiHealthNormal
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></GiHealthNormal>
              </Box>
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
              <Box className='bg-gradient-to-tr from-red-600/100 to-red-500/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Jogos{' '}
                </h2>

                <FaVolleyballBall
                  size={150}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></FaVolleyballBall>
              </Box>
              <Box className='bg-gradient-to-tr from-pink-600/100 to-pink-500/80 col-span-1 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Relatórios{' '}
                </h2>
                <HiOutlineDocumentText
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></HiOutlineDocumentText>
              </Box>
              <Box className='bg-gradient-to-tr from-teal-400/100 to-teal-700/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
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
            </div>
          </div>
        )}
        {menu === Menu.CALENDAR && (
          <div className='flex flex-col gap-4 pt-28 relative w-full'>
            <h1 className='text-3xl font-bold'>Calendário</h1>
            <CalendarView></CalendarView>
          </div>
        )}
      </div>
    </main>
  );
}
