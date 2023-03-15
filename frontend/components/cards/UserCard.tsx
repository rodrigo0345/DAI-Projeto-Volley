import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';

const Card = styled.div`
  .symbol {
    transition: transform 0.5s ease;
  }
  &:hover {
    .symbol {
      transform: translate(-2em, -2em);
    }
  }
`;

export default function UserCard({ user }: { user: LoginUser | undefined }) {
  return (
    <Card>
      <div className='overflow-hidden relative w-52 h-60 bg-gray-300 rounded-lg flex flex-col px-4 shadow-lg hover:bg-yellow-500/40 transition-all cursor-pointer'>
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
      </div>
    </Card>
  );
}
