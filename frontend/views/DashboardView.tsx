import { signup } from 'Frontend/generated/AuthenticationController';
import RegisterRequest from 'Frontend/generated/com/example/application/controller/Auth/RegisterRequest';
import { useRef } from 'react';

export default function DashboardView() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault();
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    const firstnameValue = firstname.current?.value;
    const lastnameValue = lastname.current?.value;
    const roleValue = role.current?.value;

    const register: RegisterRequest = {
      email: emailValue,
      password: passwordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
    };

    try {
      let resultSignup = await signup(register);
      console.log({ resultSignup });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen'>
      <form className='py-44 flex flex-col gap-3' onSubmit={onSubmit}>
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
        <input
          type='text'
          className='bg-gray-200'
          placeholder='First Name'
          ref={firstname}
        />
        <input
          type='text'
          className='bg-gray-200'
          placeholder='Last Name'
          ref={lastname}
        />
        <input
          type='text'
          className='bg-gray-200'
          placeholder='Role'
          ref={role}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
