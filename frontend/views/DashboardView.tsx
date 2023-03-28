import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { useContext, useRef, useState } from 'react';
import SidePanel, {
  AsideContent,
} from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';

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
          size={20}
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
          size={20}
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
    <main className='min-h-screen flex'>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <div>
        {menu === Menu.DASHBOARD && (
          <div className='flex flex-col gap-4 pt-28'>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <p className='text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        )}
        {menu === Menu.CALENDAR && (
          <div className='flex flex-col gap-4 pt-28'>
            <h1 className='text-3xl font-bold'>Calendário</h1>
            <p className='text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
