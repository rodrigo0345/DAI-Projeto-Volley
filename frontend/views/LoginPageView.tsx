import { useContext, useEffect, useRef, useState } from 'react';
import {
  authenticate,
  register,
} from 'Frontend/generated/AuthenticationController';
import AuthenticationRequest from 'Frontend/generated/com/example/application/controller/Auth/AuthenticationRequest';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { findAll } from 'Frontend/generated/UserController';
import background from 'Frontend/assets/images/vitoria_ground.png';
import { login as loginServer } from 'Frontend/generated/AuthenticationController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { UserContext } from 'Frontend/contexts/UserContext';
import { toast } from 'react-toastify';
import MainBackground from 'Frontend/components/backgrounds/MainBackground';

export default function LoginPageView(): JSX.Element {
  const { login } = useContext(UserContext);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState<String | null>(null);
  const [passwordError, setPasswordError] = useState<String | null>(null);

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<(LoginUser | undefined)[]>([]);

  const notify = (msg: string) => {
    toast.error(msg, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setPasswordError(null);
    setEmailError(null);

    if (!password.current?.value) {
      password.current?.focus();
      setPasswordError('Password is required');
    }
    if (!email.current?.value) {
      email.current?.focus();
      setEmailError('Email is required');
    }
    if (!password.current?.value || !email.current?.value) {
      setLoading(false);
      return;
    }

    let response: LoginUser | undefined;
    try {
      response = await loginServer(
        email.current?.value,
        password.current?.value
      );
    } catch (e) {
      console.log(e);
    }

    if (!response) {
      // TODO add error message
      notify('Email ou Palavra-passe incorretos!');
      email.current.value = '';
      password.current.value = '';
      setLoading(false);
      return;
    }

    login(response);

    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmailError(null);
      setPasswordError(null);
    }, 300000);

    return () => {
      clearTimeout(timeout);
    };
  }, [emailError, passwordError]);

  return (
    <div className='relative w-full flex'>
      <MainBackground>
        <div className='relative w-full flex'>
          <div className='md:!w-1/2 w-full'>
            <form
              action='#'
              onSubmit={(e) => {
                setLoading(true);
                handleSubmit(e);
              }}
            >
              <div className='flex flex-col items-center justify-center h-screen'>
                <div className='flex flex-col items-start justify-center gap-8'>
                  <div className='flex flex-col items-start justify-start gap-2'>
                    <h1 className='text-4xl font-bold m-0 dark:text-white'>
                      Login
                    </h1>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col items-start justify-center gap-4'>
                      <label htmlFor='email' className='dark:text-white'>
                        Email{' '}
                        {emailError && (
                          <span className='text-red-500 text-xs before:content-["*"]'>
                            {emailError}
                          </span>
                        )}
                      </label>
                      <input
                        max={60}
                        ref={email}
                        type='text'
                        name='Email'
                        id='email'
                        placeholder='Email'
                        className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-yellow-500'
                      />
                    </div>
                    <div className='flex flex-col items-start justify-center gap-4'>
                      <label htmlFor='password' className='dark:text-white'>
                        Password{' '}
                        {passwordError && (
                          <span className='text-red-500 text-xs before:content-["*"]'>
                            {passwordError}
                          </span>
                        )}
                      </label>
                      <input
                        max={100}
                        ref={password}
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-yellow-500'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <button
                      type='submit'
                      className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-yellow-500 hover:bg-gray-300 disabled:bg-gray-200/30 dark:text-white'
                      disabled={loading}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='hidden md:!block w-1/2 bg-black min-h-screen'>
            <img
              className='h-full -z-10 w-screen object-cover'
              src={background}
              alt=''
            />
          </div>
        </div>
      </MainBackground>
    </div>
  );
}
