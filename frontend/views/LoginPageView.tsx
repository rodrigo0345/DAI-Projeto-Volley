import { useEffect, useRef, useState } from 'react';
import {
  authenticate,
  register,
} from 'Frontend/generated/AuthenticationController';
import AuthenticationRequest from 'Frontend/generated/com/example/application/controller/Auth/AuthenticationRequest';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import User from 'Frontend/generated/com/example/application/model/User/User';
import { findAll } from 'Frontend/generated/UserController';

export default function LoginPageView() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<(User | undefined)[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password.current?.value || !username.current?.value) return;

    const aux: AuthenticationRequest = {
      email: username.current?.value,
      password: password.current?.value,
    };

    const aux2: RegisterRequest = {
      email: username.current?.value,
      password: password.current?.value,
    };

    let result;
    result = await authenticate(aux);

    console.log('Register ', result);

    if (!result) {
      console.log('Error');
    }
    //window.location.href = '/';
  }

  useEffect(() => {
    (async () => {
      const result = await findAll();
      setUsers(result);
    })();
  });
  return (
    <div className='relative w-full flex'>
      <div className='w-1/2'>
        {users.map((user) => (
          <div className='pt-44' key={user?.id}>
            <p>{user?.email}</p>
          </div>
        ))}
        <form action='#' onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-start justify-center gap-8'>
              <div className='flex flex-col items-start justify-start gap-2'>
                <h1 className='text-4xl font-bold m-0'>Login 01</h1>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-4'>
                  <label htmlFor='username'>Email</label>
                  <input
                    ref={username}
                    type='text'
                    name='Username'
                    id='username'
                    placeholder='Username'
                    className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
                  />
                </div>
                <div className='flex flex-col items-start justify-center gap-4'>
                  <label htmlFor='password'>Password</label>
                  <input
                    ref={password}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <button
                  type='submit'
                  className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='w-1/2 bg-black min-h-screen'>{/*Put image*/}</div>
    </div>
  );
}
