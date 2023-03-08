import MainBackground from 'Frontend/components/backgrounds/MainBackground';
import { AnimatePresence, motion } from 'framer-motion';
import { BsArrowDownShort } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
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
    <div className='flex flex-col gap-36 h-fit'>
      <div className='flex flex-col items-center min-h-screen w-full h-fit'>
        <MainBackground>
          <main className='w-full relative h-fit py-44'>
            <div className='sm:max-w-5xl w-full sm:w-36 m-auto pb-32 px-8'>
              <h1 className=' text-2xl sm:!text-5xl font-semibold  text-zinc-800 text-center sm:!text-start'>
                Gerir a tua equipa nunca
                <br /> foi tão <span>fácil</span>
              </h1>
              <div className='flex gap-4 items-center flex-col sm:!flex-row'>
                <a
                  href='#'
                  className='cursor-pointer text-gray-800 bg-transparent outline outline-2 outline-gray-700/60 dark:outline-gray-100/60 hover:outline-yellow-600 w-fit whitespace-nowrap md:!py-2 sm:py-1 px-4 dark:text-gray-100 font-semibold  rounded-full hover:no-underline text-md'
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
            <div className='w-full h-[35rem] relative flex flex-wrap shadow-lg shadow-yellow-600/50'>
              <div className='h-full lg:!w-1/2 w-full outline outline-1 outline-zinc-800 flex flex-col items-end justify-center '>
                <div className='h-full flex flex-col justify-center items-center gap-8 px-10'>
                  <AnimatedTitleGroup className='flex flex-col gap-0 cursor-default'>
                    <h2
                      id='t-01'
                      className='text-center font-extralight  my-0 sm:text-2xl lg:!text-5xl'
                    >
                      Encontre boleias.
                    </h2>
                    <h2
                      id='t-02'
                      className='text-center font-normal sm:text-2xl lg:!text-5xl my-1'
                    >
                      Encontre estatísticas.
                    </h2>
                    <h2
                      id='t-03'
                      className='text-center font-semibold sm:text-2xl lg:!text-5xl my-0'
                    >
                      Faça uma gestão dos treinos.
                    </h2>
                  </AnimatedTitleGroup>
                  <p className='w-full lg:w-1/2 text-center text-lg'>
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
              </div>
              <div className='lg:!flex hidden relative h-full w-1/2 outline outline-1 outline-zinc-800 shadow-xl items-center'>
                <div className='w-fit h-[125%] rounded-lg shadow-lg shadow-gray-800/10 p-3 backdrop-blur-lg outline outline-2 outline-gray-800/40'>
                  <img
                    className='rounded-lg object-cover h-full'
                    src='../assets/images/Screenshot_20230111_094919.png'
                    alt=''
                  />
                </div>
                <div className='w-1/2 flex items-center justify-start px-4'>
                  <IoMdArrowBack size={50} className='animate-bounce' />
                  <div>
                    <h3 className='m-0 italic font-bold text-4xl'>Simples</h3>
                    <h3 className='m-0 italic font-bold text-4xl'>e fácil</h3>
                    <h3 className='m-0 italic font-bold text-4xl'>de usar!</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </MainBackground>
      </div>
    </div>
  );
}
