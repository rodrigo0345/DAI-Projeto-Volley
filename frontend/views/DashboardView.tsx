import { signup } from 'Frontend/generated/AuthenticationController';
import { useRef } from 'react';

export default function DashboardView() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function onSubmit() {
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;

    try {
      signup({ email: emailValue, password: passwordValue });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen'>
      <form
        className='py-44'
        onClick={() => {
          onSubmit();
        }}
      >
        <input
          type='email'
          className='bg-gray-200'
          placeholder='Email'
          ref={email}
        />
        <input
          type='password'
          className='bg-gray-200'
          placeholder='Password'
          ref={password}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
