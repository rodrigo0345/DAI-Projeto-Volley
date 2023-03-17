import { findById } from 'Frontend/generated/UserController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { useEffect, useState, startTransition } from 'react';
import { redirect, useActionData, useLoaderData } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

export default function ProfilesView() {
  const [user, setUser] = useState<LoginUser | undefined>();
  const match = useMatch('/profiles/:id');
  const userId = match?.params.id;

  useEffect(() => {
    if (!userId) return;

    startTransition(() => {
      (async () => {
        let user: LoginUser | undefined;

        try {
          user = await findById(Number(userId));
        } catch (e) {
          if (user === undefined) window.location.href = '/404';
        }
        console.log(user);

        setUser(user);
      })();
    });
  }, [userId]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {user && (
        <div className='bg-gray-200 w-fit h-fit'>
          <h1 className='text-2xl font-bold'>
            {user?.firstname + ' ' + user?.lastname}
          </h1>
          <input type='text' readOnly value={user?.firstname} />
          <input type='text' readOnly value={user?.lastname} />
          <input type='text' readOnly value={user?.email} />

          <input type='text' readOnly value={user?.role} />
        </div>
      )}
    </div>
  );
}
