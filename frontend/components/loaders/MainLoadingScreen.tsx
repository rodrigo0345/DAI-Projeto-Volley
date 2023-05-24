import logo from '../../assets/images/Logo-512x512-1.png';
import MainBackground from '../backgrounds/MainBackground';

export default function MainLoadingScreen() {
  return (
    <div>
      <MainBackground>
        <div className='min-h-screen justify-center items-center flex flex-col gap-4'>
          <img
            src={logo}
            alt='Vitória de Guimarães'
            className='animate-pulse h-28'
          />
          <h2>Vitória de Guimarães</h2>
        </div>
      </MainBackground>
    </div>
  );
}
