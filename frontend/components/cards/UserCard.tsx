import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import styled from 'styled-components';
import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineCloseCircle, AiOutlineDelete } from 'react-icons/ai';
import { deleteUser } from 'Frontend/generated/UserController';
import { useContext } from 'react';
import { UserContext } from 'Frontend/contexts/UserContext';
import { toast } from 'react-toastify';

const Card = styled.div`
  position: relative;
  overflow: hidden;
  width: fit-content;
  min-width: fit-content;
  height: fit-content;
  min-height: fit-content;
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

export default function UserCard({
  userSubject,
}: {
  userSubject: LoginUser | undefined;
}) {
  const { user } = useContext(UserContext);

  return (
    <Card>
      {!(userSubject?.id === user?.id) && (
        <button
          className='delete bg-red-400 font-bold absolute z-10 right-0 p-2 rounded-md overflow-hidden hover:bg-red-500'
          title='Delete'
          onClick={() => {
            (async () => {
              const result = await deleteUser(userSubject?.id, user);
              if (!result) {
                toast.error('Erro ao eliminar jogador');
              }
              toast.success('Utilizador eliminado com sucesso');
              // reload window
              window.location.reload();
            })();
          }}
        >
          <AiOutlineCloseCircle size={25}></AiOutlineCloseCircle>
        </button>
      )}
      <a
        href={'/profiles/' + userSubject?.id}
        className='overflow-hidden relative w-52 h-60 bg-gray-300 rounded-lg flex flex-col px-4 shadow-lg hover:bg-yellow-500/40 transition-all cursor-pointer underline-none hover:no-underline
        '
      >
        <div className='transition-all flex items-center pt-4 gap-1'>
          <h5 className='transition-all lowercase font-light m-0'>
            {userSubject?.role}
          </h5>
        </div>
        <h2 className='text-base m-0'>
          {userSubject?.firstname} {userSubject?.lastname}
        </h2>
        {userSubject?.role?.includes('ADMIN') && (
          <MdOutlineAdminPanelSettings
            className='symbol absolute font-light text-gray-400/40 -right-20 -bottom-10'
            size={200}
          ></MdOutlineAdminPanelSettings>
        )}
        {userSubject?.role?.includes('MANAGER') && (
          <BsPersonFill
            className='symbol absolute font-light text-gray-400/40 -right-20 -bottom-10'
            size={200}
          ></BsPersonFill>
        )}
      </a>
    </Card>
  );
}
