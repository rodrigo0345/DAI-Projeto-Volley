import { UserContext } from 'Frontend/contexts/UserContext';
import { findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { useEffect, useState, startTransition, useContext } from 'react';
import { redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

export default function ProfilesView() {
  let { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<LoginUser | undefined>();
  const match = useMatch('/profiles/:id');
  const userId = match?.params.id;

  const [editable, setEditable] = useState(false);
  const [firstName, setFirstName] = useState(userProfile?.firstname);
  const [lastName, setLastName] = useState(userProfile?.lastname);
  const [email, setEmail] = useState(userProfile?.email);
  const [role, setRole] = useState(userProfile?.role);

  useEffect(() => {
    if (!userId) return;

    if (user?.id === Number(userId)) setEditable(true);
    console.log(user?.id);

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
      })();
    });
  }, [userId]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-gray-200 w-fit h-fit'>
        <h1 className='text-2xl font-bold'>
          {userProfile?.firstname + ' ' + userProfile?.lastname}
        </h1>
        <input type='text' value={firstName} />
        <input type='text' value={lastName} />
        <input type='text' value={email} />

        <input type='text' value={role} />
      </div>
    </div>
  );
}
