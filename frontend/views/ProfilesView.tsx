import { UserContext } from 'Frontend/contexts/UserContext';

import { editPost } from 'Frontend/generated/PostController';
import { editUser, findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import { motion } from 'framer-motion';
import { useEffect, useState, startTransition, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState(userProfile?.role);

  useEffect(() => {
    //if (!userId || user?.id) window.location.href = '/404';

    if (user?.id === Number(userId) || user?.role === 'ADMIN')
      setNotMyProfile(false);

    startTransition(() => {
      (async () => {
        let user: LoginUser | undefined;

        try {
          user = await findById(Number(userId));
        } catch (e) {
          if (user === undefined) window.location.href = '/404';
        }

        setUserProfile(user);
        setFirstName(user?.firstname);
        setLastName(user?.lastname);
        setEmail(user?.email);
        setRole(user?.role);
      })();
    });
  }, [user]);

  async function submitChanges(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    const result = await editUser(user, {
      firstname: firstName,
      lastname: lastName,
      email: email,
      role: Roles[role as keyof typeof Roles],
      id: userProfile?.id,
      password: password,
    });

    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    toast.success('Profile updated');
    return;
  }

  return (
    <motion.div
      layout
      className='min-h-screen flex items-center justify-center z-10 bg-white relative shadow-lg'
    >
      <motion.div
        layout
        className='bg-zinc-100 w-fit h-fit flex flex-col p-6 rounded-md shadow-lg gap-4'
      >
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
        <motion.input
          layout
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
        <motion.input
          layout
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
        <motion.input
          layout
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

        <motion.input
          layout
          className={`outline outline-1 border-none rounded-md focus:ring-transparent`}
          type='text'
          disabled
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />

        {editable && user?.role === 'ADMIN' && (
          <motion.input
            layout
            type='password'
            className={`outline outline-1 border-none rounded-md focus:ring-transparent ${
              editable
                ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none'
                : 'outline-none focus:outline-none focus:border-none'
            }`}
            placeholder='Alterar palavra-passe'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        )}

        {editable && (
          <motion.button
            layout
            className='bg-green-500 text-white font-semibold rounded-md py-2 hover:bg-green-400'
            onClick={submitChanges}
          >
            Guardar alterações
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
