import MainBackground from 'Frontend/components/backgrounds/MainBackground';

export default function LandPageView() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <MainBackground />
      <div className='flex flex-col gap-4 border-l-8 border-gray-500/30 p-4'>
        <h1 className='font-bold text-gray-50 text-[4rem] m-0 cursor-default relative'>
          Vitória de{' '}
          <span className='relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-3 before:bg-yellow-600/60 before:bottom-2 before:transition-all hover:before:translate-y-2'>
            Guimarães
          </span>
        </h1>
        <p className='font-semibold text-gray-200 text-xl'>
          Bem-vindo ao nosso site de gestão de boleias e <br />
          estatísticas da secção de voleibol
        </p>
        <a
          href=''
          className='cursor-pointer text-gray-50 bg-yellow-600/60 hover:bg-yellow-600/80 dark:text-gray-100 font-bold py-2 px-4 rounded-md hover:no-underline text-l'
        >
          Login
        </a>
      </div>
    </div>
  );
}
