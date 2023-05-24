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
    <section className='relative z-10 shadow-lg scroll-smooth overflow-hidden max-w-screen'>
      <div className='bg-white'>
        <div className='relative isolate px-6 pt-14 lg:px-8'>
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
          <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
            <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'
              >
                Vem exprimentar a aplicação.{' '}
                <a href='/login' className='font-semibold text-yellow-400'>
                  <span className='absolute inset-0' aria-hidden='true'></span>
                  Começa já <span aria-hidden='true'>&rarr;</span>
                </a>
              </motion.div>
            </div>
            <div className='text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                Gerir a tua equipa nunca foi tão fácil
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                Aqui consegues manter-te a par do que se passa na tua equipa.
                Desde encontrar boleia para os jogos e treinos a gerir as
                presenças dos jogadores.
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href='/login'
                  className='rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400'
                >
                  Começa já
                </a>
                <a
                  href='#funcionalidades'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Descobre mais <span aria-hidden='true'>→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-yellow-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            ></div>
          </div>
        </div>
      </div>
      <section
        className='py-10 bg-white sm:py-16 lg:py-24'
        id='funcionalidades'
      >
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16'>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-blue-100'
                  width='72'
                  height='75'
                  viewBox='0 0 72 75'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z' />
                </svg>
                <svg
                  className='absolute text-blue-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Vê notícias
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Treinadores e Administradores podem sempre publicar notícias
                para que todos fiquem a par das novidades.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-orange-100'
                  width='62'
                  height='64'
                  viewBox='0 0 62 64'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z' />
                </svg>
                <svg
                  className='absolute text-orange-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Oferece boleias
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Planear uma viagem nunca foi tão fácil. Com a nossa plataforma
                podes oferecer boleias aos teus colegas para os jogos e treinos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-green-100'
                  width='66'
                  height='68'
                  viewBox='0 0 66 68'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z' />
                </svg>
                <svg
                  className='absolute text-green-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Marca convocatórias
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Anota os jogadores que serão convocados para os jogos e treinos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-purple-100'
                  width='66'
                  height='68'
                  viewBox='0 0 66 68'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z' />
                </svg>
                <svg
                  className='absolute text-purple-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Cria equipas
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Divide a secção em vários escalões e equipas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-gray-100'
                  width='65'
                  height='70'
                  viewBox='0 0 65 70'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z' />
                </svg>
                <svg
                  className='absolute text-gray-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Marca presenças
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Faz o registo de quem veio aos treinos e jogos para que depois
                possam ser obtidos dados estatísticos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-yellow-100'
                  width='78'
                  height='78'
                  viewBox='0 0 78 78'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z' />
                </svg>
                <svg
                  className='absolute text-yellow-500 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Acede ao calendário
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Sempre que planeares alguma coisa, o calendário está lá para ti.
                Vê os dias em que tens treinos, jogos ou boleias agendadas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-gray-100'
                  width='62'
                  height='64'
                  viewBox='0 0 62 64'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z'></path>
                </svg>
                <svg
                  className='absolute text-gray-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Guarda estatísticas
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                No final do ano, repensa as tuas decisões com base nos dados
                estatísticos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-rose-100'
                  width='72'
                  height='75'
                  viewBox='0 0 72 75'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z' />
                </svg>
                <svg
                  className='absolute text-rose-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Transmite jogos
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Vê todos os jogos em direto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className='relative flex items-center justify-center mx-auto'>
                <svg
                  className='text-lime-100'
                  width='62'
                  height='65'
                  viewBox='0 0 62 65'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 13.0264C0 33.4609 8.06546 64.0264 28.5 64.0264C48.9345 64.0264 62 50.4604 62 30.0259C62 9.59135 59.4345 4.0256 39 4.0256C18.5655 4.0256 0 -7.40819 0 13.0264Z' />
                </svg>

                <svg
                  className='absolute text-lime-600 w-9 h-9'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1.5'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='mt-8 text-lg font-semibold text-black'>
                Fast & Easy to Load
              </h3>
              <p className='mt-4 text-base text-gray-600'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className='py-10 bg-gray-100 sm:py-16 lg:py-24' id='sobrenos'>
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl'>
              Mais sobre nós
            </h2>
            <p className='max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600'>
              Esta aplicação foi desenvolvida no âmbito da unidade curricular de
              Desenvolvimento de Aplicações Informáticas e tem como objetivo
              facilitar a gestão de boleias e membros da secção de voleibol do
              <span className='font-bold'> Vitória de Guimarães</span>.
            </p>
          </div>

          <ul className='max-w-md mx-auto mt-16 space-y-12'>
            <li className='relative flex items-start'>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className='-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full'
                aria-hidden='true'
              ></motion.div>

              <div className='relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow'>
                <svg
                  className='w-10 h-10 text-yellow-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <motion.div
                initial={{ x: 100 }}
                whileInView={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className='ml-6'
              >
                <h3 className='text-lg font-semibold text-black'>
                  registo de contas
                </h3>
                <p className='mt-4 text-base text-gray-600'>
                  De modo a registrar novas contas, é necessário que contacte o
                  administrador da aplicação. Só ele tem permissões para criar
                  novas contas.
                </p>
              </motion.div>
            </li>

            <li className='relative flex items-start'>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className='-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full'
                aria-hidden='true'
              ></motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className='relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow'
              >
                <svg
                  className='w-10 h-10 text-yellow-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1'
                    d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className='ml-6'
              >
                <h3 className='text-lg font-semibold text-black'>
                  Funcionalidades
                </h3>
                <p className='mt-4 text-base text-gray-600'>
                  Todas as funcionalidades aqui presentes têm como objetivo
                  facilitar a gestão e organização da secção de voleibol do
                  Vitória de Guimarães.
                </p>
              </motion.div>
            </li>

            <li className='relative flex items-start'>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className='relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow'
              >
                <svg
                  className='w-10 h-10 text-yellow-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='1'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.7 }}
                className='ml-6'
              >
                <h3 className='text-lg font-semibold text-black'>
                  Privacidade
                </h3>
                <p className='mt-4 text-base text-gray-600'>
                  Todos os dados recolhidos são de uso exclusivo da secção de
                  voleibol do Vitória de Guimarães e não serão partilhados com
                  terceiros.
                </p>
              </motion.div>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}
