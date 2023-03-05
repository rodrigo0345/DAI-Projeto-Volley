import MainBackground from 'Frontend/components/backgrounds/MainBackground';
import { AnimatePresence, motion } from 'framer-motion';
import { BsArrowDownShort } from 'react-icons/bs';
import styled from 'styled-components';

const AnimatedTitleGroup = styled.div`
  #t-01 {
    transition: 0.5s ease-in-out;
    transform: translateY(0);
  }

  #t-02 {
    transition: 0.7s ease-in-out;
    transform: translateY(0);
  }

  #t-03 {
    transition: 1s ease-in-out;
    transform: translateY(0px);
  }

  &:hover {
    #t-01 {
      transition: 0.5s ease-in-out;
      transform: translateY(-50px);
    }

    #t-02 {
      transition: 0.7s ease-in-out;
      transform: translateY(-40px);
    }

    #t-03 {
      transition: 1s ease-in-out;
      transform: translateY(-30px);
    }
  }
`;

export default function LandPageView() {
  return (
    <div className='flex flex-col gap-36'>
      <div className='flex flex-col items-center min-h-screen w-full py-44'>
        <MainBackground />
        <main className='w-full relative'>
          <div className='sm:max-w-5xl w-full sm:w-36 m-auto pb-32'>
            <h1 className='font-semibold text-5xl text-zinc-800'>
              Gerir a tua equipa nunca
              <br /> foi tão <span>fácil</span>
            </h1>
            <div className='flex gap-4 items-center'>
              <a
                href='#'
                className='cursor-pointer text-gray-800 bg-transparent outline outline-2 outline-gray-700/60 dark:outline-gray-100/60 hover:outline-yellow-600 w-fit whitespace-nowrap py-2 px-4 dark:text-gray-100 font-semibold  rounded-full hover:no-underline text-md'
              >
                Começa já
              </a>
              <a
                href='#'
                className='w-fit text-zinc-800 flex items-center gap-1 font-semibold hover:no-underline'
              >
                Ver funcionalidades
                <span className=''>
                  <BsArrowDownShort />
                </span>
              </a>
            </div>
          </div>
          <div className='w-full h-[35rem] relative flex flex-wrap'>
            <div className='h-full w-1/2 outline outline-1 outline-zinc-800 shadow-xl flex flex-col justify-center items-center gap-8'>
              <AnimatedTitleGroup className='flex flex-col gap-0 cursor-default'>
                <h2
                  id='t-01'
                  className='text-center font-extralight text-5xl my-0'
                >
                  Encontre boleias.
                </h2>
                <h2 id='t-02' className='text-center font-normal text-5xl my-1'>
                  Encontre estatísticas.
                </h2>
                <h2
                  id='t-03'
                  className='text-center font-semibold text-5xl my-0'
                >
                  Faça uma gestão dos treinos.
                </h2>
              </AnimatedTitleGroup>
              <p className='w-1/2 text-center text-lg'>
                Com nossa app, encontre facilmente boleias para eventos,
                trabalho, viagens e muito mais
              </p>
              <a
                href='#'
                className='cursor-pointer text-gray-800 bg-transparent outline outline-2 outline-gray-700/60 dark:outline-gray-100/60 hover:outline-yellow-600 w-fit whitespace-nowrap py-2 px-4 dark:text-gray-100 font-semibold  rounded-full hover:no-underline text-md self-center'
              >
                Começa já
              </a>
            </div>
            <div className='relative h-full w-1/2 outline outline-1 outline-zinc-800 shadow-xl flex items-center'>
              <div className='w-1/2 h-[125%] rounded-lg shadow-lg shadow-gray-800/10 p-3 backdrop-blur-lg outline outline-2 outline-gray-800/40'>
                <img
                  className='rounded-lg'
                  src='../assets/images/Screenshot_20230111_094919.png'
                  alt=''
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}