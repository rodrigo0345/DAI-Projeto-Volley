import { UserContext } from 'Frontend/contexts/UserContext';
import { findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { useEffect, useState, startTransition, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

export default function ProfilesView() {
  let { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<LoginUser | undefined>();
  const match = useMatch('/profiles/:id');
  const userId = match?.params.id;

  const [editable, setEditable] = useState(false);
  const [notMyProfile, setNotMyProfile] = useState(true);

  const [firstName, setFirstName] = useState(userProfile?.firstname);
  const [lastName, setLastName] = useState(userProfile?.lastname);
  const [email, setEmail] = useState(userProfile?.email);
  const [role, setRole] = useState(userProfile?.role);

  useEffect(() => {
    console.log({ user }, { userId });
    //if (!userId || user?.id) window.location.href = '/404';

    if (user?.id === Number(userId)) setNotMyProfile(false);

    startTransition(() => {
      (async () => {
        let user: LoginUser | undefined;

        try {
          user = await findById(Number(userId));
        } catch (e) {
          if (user === undefined) window.location.href = '/404';
        }
        console.log(user);

        setUserProfile(user);
        setFirstName(user?.firstname);
        setLastName(user?.lastname);
        setEmail(user?.email);
        setRole(user?.role);
      })();
    });
  }, [user]);

  function submitChanges(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='min-h-screen flex items-center justify-center z-10 bg-white'>
      <div className='bg-zinc-100 w-fit h-fit flex flex-col p-6 rounded-md shadow-lg gap-4'>
        <div className='flex justify-center gap-4'>
          <h1 className='text-2xl font-bold my-4'>
            {userProfile?.firstname + ' ' + userProfile?.lastname}
          </h1>
          {!notMyProfile && (
            <button
              onClick={() => {
                setEditable((editable) => !editable);
              }}
            >
              <AiOutlineEdit size={25}></AiOutlineEdit>
            </button>
          )}
        </div>
        <input
          className={`outline outline-1  border-none rounded-md focus:ring-transparent ${
            editable
              ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none'
              : 'outline-none focus:outline-none focus:border-none'
          }`}
          type='text'
          {...(editable ? { disabled: false } : { disabled: true })}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className={`outline outline-1 border-none rounded-md focus:ring-transparent ${
            editable
              ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none'
              : 'outline-none focus:outline-none focus:border-none'
          }`}
          type='text'
          {...(editable ? { disabled: false } : { disabled: true })}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          className={`outline outline-1 border-none rounded-md focus:ring-transparent ${
            editable
              ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none'
              : 'outline-none focus:outline-none focus:border-none'
          }`}
          type='email'
          {...(editable ? { disabled: false } : { disabled: true })}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className={`outline outline-1 border-none rounded-md focus:ring-transparent`}
          type='text'
          disabled
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />

        {editable && (
          <button
            className='bg-green-500 text-white font-semibold rounded-md py-2 hover:bg-green-400'
            onClick={submitChanges}
          >
            Guardar alterações
          </button>
        )}
      </div>
    </div>
  );
}
