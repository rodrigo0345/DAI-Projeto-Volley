import { useContext, useEffect, useRef, useState } from 'react';
import {
  authenticate,
  register,
} from 'Frontend/generated/AuthenticationController';
import AuthenticationRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers/AuthenticationRequest';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/Wrappers/RegisterRequest';
import { findAll } from 'Frontend/generated/UserController';
import background from 'Frontend/assets/images/vitoria_ground.png';
import { login as loginServer } from 'Frontend/generated/AuthenticationController';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { UserContext } from 'Frontend/contexts/UserContext';
import { toast } from 'react-toastify';
import MainBackground from 'Frontend/components/backgrounds/MainBackground';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import volei from 'Frontend/assets/images/volei.jpg';

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

    let response: ResponseEntity | undefined;
    try {
      response = await loginServer(
        email.current?.value,
        password.current?.value
      );
    } catch (e) {
      console.warn(e);
    }

    if (response?.body.error) {
      notify(response?.body.error);
      email.current.value = '';
      password.current.value = '';
      setLoading(false);
      return;
    }

    login(response?.body.success as LoginUser);

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
    <div className='relative w-full flex z-10 bg-white'>
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
                  <h1 className='text-4xl font-bold m-0'>Login</h1>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <div className='flex flex-col items-start justify-center gap-4'>
                    <label htmlFor='email' className=''>
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
                      className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-transparent focus:border-yellow-400'
                    />
                  </div>
                  <div className='flex flex-col items-start justify-center gap-4'>
                    <label htmlFor='password' className=''>
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
                      className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-transparent focus:border-yellow-400'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                  <button
                    type='submit'
                    className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-yellow-400 hover:bg-gray-300 disabled:bg-gray-200/30'
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
            className='h-full -z-10 w-screen object-cover object-top'
            src={volei}
            alt=''
          />
        </div>
      </div>
    </div>
  );
}
