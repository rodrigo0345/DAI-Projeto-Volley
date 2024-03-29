import { UserContext } from 'Frontend/contexts/UserContext';

import { editPost } from 'Frontend/generated/PostController';
import { editUser, findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import Roles from 'Frontend/generated/com/example/application/model/User/Roles';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import { motion } from 'framer-motion';
import { useEffect, useState, startTransition, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

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
        let user: ResponseEntity | undefined;

        try {
          user = await findById(Number(userId));
        } catch (e) {
          if (user === undefined) window.location.href = '/404';
        }

        setUserProfile(user?.body.success);
        setFirstName(user?.body.success.firstname);
        setLastName(user?.body.success.lastname);
        setEmail(user?.body.success.email);
        setRole(user?.body.success.role);
      })();
    });
  }, [user]);

  async function submitChanges(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (!validator.isEmail(email ?? '')) {
      toast.error('Invalid email');
      return;
    }

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

    toast.success('Utilizador editado com sucesso');
    setEditable(false);
    return;
  }

  return (
    <motion.div
      layout
      className='min-h-screen flex items-center justify-center z-10 bg-white relative shadow-lg'
    >
      <div
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
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
