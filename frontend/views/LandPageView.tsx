import MainBackground from 'Frontend/components/backgrounds/MainBackground';
import { AnimatePresence, motion } from 'framer-motion';

export default function LandPageView() {
  return (
    <>
      <div className='flex flex-col items-center min-h-screen w-full py-44'>
        <MainBackground />
        <main className='sm:max-w-5xl w-full'></main>
      </div>
    </>
  );
}
