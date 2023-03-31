import SidePanel, {
  AsideContent,
} from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { useContext, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsCalendarDate, BsCarFront } from 'react-icons/bs';
import { MdOutlineForum } from 'react-icons/md';
import { ImNewspaper } from 'react-icons/im';
import * as Select from '@radix-ui/react-select';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import React from 'react';

enum Menu {
  ALL = 'ALL',
  NEWS = 'NEWS',
  RIDES = 'RIDES',
}

export default function ForumView() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState<Menu>(Menu.ALL);

  const content: AsideContent<Menu>[] = [
    {
      id: 0,
      text: 'All Posts',
      icon: (
        <MdOutlineForum
          color={menu === Menu.ALL ? 'white' : 'black'}
          size={20}
        ></MdOutlineForum>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.ALL,
      link: '/all',
    },
    {
      id: 1,
      text: 'Boleias',
      icon: (
        <BsCarFront
          color={menu === Menu.RIDES ? 'white' : 'black'}
          size={20}
        ></BsCarFront>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.RIDES,
      link: '/calendar',
    },
    {
      id: 2,
      text: 'Notícias',
      icon: (
        <ImNewspaper
          color={menu === Menu.NEWS ? 'white' : 'black'}
          size={20}
        ></ImNewspaper>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.NEWS,
      link: '/calendar',
    },
    // adicionar novos menus é aqui
  ];

  return (
    <div className='min-h-screen flex relative'>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <div className='flex-1 relative pt-36 px-10 text-gray-300'>
        <div className='flex justify-between items-center max-w-[60em] m-auto'>
          <h1 className='text-3xl font-bold m-0'>Forum</h1>
          <div className='shadow-lg min-w-[10em] bg-zinc-800 rounded-md h-10 flex items-center p-4'>
            <label htmlFor='' className='text-white text-sm'>
              Ordernar por:{' '}
            </label>
            <Select.Root>
              <Select.Trigger
                className='inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-transparent shadow-black/10 data-[placeholder]:text-gray-600 focus:outline-none aria-selected:outline-none text-white font-semibold'
                aria-label='Ordenar por...'
              >
                <Select.Value placeholder='Select a fruit…' />
                <Select.Icon className='text-gray-300'>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className='overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
                  <Select.ScrollUpButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className='p-[5px]'>
                    <Select.Group>
                      <SelectItem value='mais recente'>Mais recente</SelectItem>
                      <SelectItem value='banana'>Mais antigo</SelectItem>
                      <SelectItem value='blueberry'>Mais relevante</SelectItem>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className='z-50 text-[13px] leading-none text-gray-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gradient-to-tr data-[highlighted]:from-yellow-300 data-[highlighted]:to-yellow-400 data-[highlighted]:text-gray-600'
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
