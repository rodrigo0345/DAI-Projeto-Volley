import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai';

const Card = styled.div`
  position: relative;
  overflow: hidden;
  .symbol {
    transition: transform 0.5s ease;
  }
  .delete {
    transition: transform 0.5s ease;
    transform: translate(4em, 0em);
  }
  &:hover {
    .symbol {
      transform: translate(-2em, -2em);
    }
    .delete {
      transform: translate(0em, 0);
    }
  }
`;

export default function UserCard({ user }: { user: LoginUser | undefined }) {
  return (
    <Card>
      <button
        className='delete bg-red-400 font-bold absolute z-10 right-0 p-2 rounded-md overflow-hidden hover:bg-red-500'
        title='Delete'
        onClick={() => {}}
      >
        <AiOutlineCloseCircle size={25}></AiOutlineCloseCircle>
      </button>
      <a
        href={'/profiles/' + user?.id}
        className='overflow-hidden relative w-52 h-60 bg-gray-300 rounded-lg flex flex-col px-4 shadow-lg hover:bg-yellow-500/40 transition-all cursor-pointer underline-none hover:no-underline
        '
      >
        <div className='transition-all flex items-center pt-4 gap-1'>
          <h5 className='transition-all lowercase font-light m-0'>
            {user?.role}
          </h5>
        </div>
        <h2 className='text-base m-0'>
          {user?.firstname} {user?.lastname}
        </h2>
        {user?.role?.includes('ADMIN') && (
          <MdOutlineAdminPanelSettings
            className='symbol absolute font-light text-gray-400/40 -right-20 -bottom-10'
            size={200}
          ></MdOutlineAdminPanelSettings>
        )}
        {user?.role?.includes('MANAGER') && (
          <BsPersonFill
            className='symbol absolute font-light text-gray-400/40 -right-20 -bottom-10'
            size={200}
          ></BsPersonFill>
        )}
      </a>
    </Card>
  );
}
