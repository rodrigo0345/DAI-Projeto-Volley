import MainBackground from 'Frontend/components/backgrounds/MainBackground';
import MainButton from 'Frontend/components/buttons/MainButton';
import { AnimatePresence, motion } from 'framer-motion';
import { BsArrowDownShort } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import landBg from 'Frontend/assets/svgs/landBg.svg';
import { Box } from './DashboardView';
import { RiTeamLine } from 'react-icons/ri';

const Hero = styled.main`
  background-image: url('${landBg}');
  background-size: cover;
  background-position: center;
`;

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
    <div className='flex flex-col gap-36 h-fit z-10 bg-white'>
      <div className='flex flex-col items-center min-h-screen w-full h-fit'>
        <main className='w-full relative h-fit '>
          <Hero className='w-full sm:w-36 min-h-[40em] py-64 px-8'>
            <motion.h1
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, bounce: 0.3, bounceStiffness: 10 }}
              className=' text-2xl sm:!text-5xl font-semibold  text-zinc-800 text-center sm:!text-start dark:text-white m-auto px-24 pb-4'
            >
              Gerir a tua equipa nunca
              <br /> foi tão <span>fácil</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className='flex gap-4 items-center flex-col sm:!flex-row px-24'
            >
              <MainButton href='/login' className='dark:!outline-yellow-300'>
                Começa já
              </MainButton>
              <a
                href='/login'
                className='w-fit text-zinc-800 flex items-center gap-1 font-semibold hover:no-underline dark:text-gray-300'
              >
                Ver funcionalidades
                <span className=''>
                  <BsArrowDownShort />
                </span>
              </a>
            </motion.div>
          </Hero>
          <div id='funcionalidades'>
            <h2>Funcionalidades</h2>
            <div className='flex gap-8 flex-wrap items-center justify-center'>
              <Box className='bg-gradient-to-br from-blue-900/100 to-cyan-600/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Gerir treinos
                </h2>
                <RiTeamLine
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></RiTeamLine>
              </Box>

              <Box className='bg-gradient-to-br from-blue-900/100 to-cyan-600/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Gerir jogos
                </h2>
                <RiTeamLine
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></RiTeamLine>
              </Box>

              <Box className='bg-gradient-to-br from-blue-900/100 to-cyan-600/80 col-span-2 h-48 shadow-xl rounded-lg scale-100 hover:scale-[1.02] transition-all px-6 overflow-hidden'>
                <h2 className='text-gray-50 font-semibold text-2xl z-20'>
                  Gerir atletas
                </h2>
                <RiTeamLine
                  size={180}
                  color='#e5e7eb'
                  className='icon absolute -right-10 -bottom-10 '
                ></RiTeamLine>
              </Box>
            </div>
          </div>
          <div id='sobrenos'>
            <h2>A Equipa</h2>
          </div>
        </main>
      </div>
    </div>
  );
}
