import MainBackground from 'Frontend/components/backgrounds/MainBackground';

// provisorio
export default function DashboardView() {
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col gap-36 h-fit'>
        <div className='flex flex-col items-center min-h-screen w-full h-fit'>
          <MainBackground>
            <main className='w-full relative h-fit py-44'>
              <div className='sm:max-w-5xl w-full sm:w-36 m-auto pb-32 px-8'>
                <h1 className=' text-2xl sm:!text-5xl font-semibold  text-zinc-800 text-center sm:!text-start dark:text-white'>
                  Gerir a tua equipa nunca
                  <br /> foi tão <span>fácil</span>
                </h1>
              </div>
              <div>
                <input type='email' />
                <input type='password' />
                <button onClick={}>Signup</button>
              </div>
            </main>
          </MainBackground>
        </div>
      </div>
    </div>
  );
}
