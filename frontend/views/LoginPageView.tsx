export default function LoginPageView() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}
  return (
    <div className='relative w-full flex'>
      <div className='w-1/2'>
        <form action='#' onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-start justify-center gap-4'>
              <div className='flex flex-col items-start justify-start gap-2'>
                <h1 className='text-4xl font-bold'>Login</h1>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-4'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email'
                    className='w-96 h-12 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500'
                  />
                </div>
                <div className='flex flex-col items-start justify-center gap-4'>
                  <label htmlFor='password'>Password</label>
                  <input
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
