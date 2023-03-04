import logo from 'Frontend/assets/images/Logo-512x512-1.png';

export default function mainHeader() {
  return (
    <div className='flex items-center bg-white dark:bg-zinc-600/50 w-full h-16 fixed px-4'>
      <div className='h-10'>
        <a href='https://vitoriasc.pt/' target='_blank'>
          <img src={logo} alt='' className='h-full' />
        </a>
      </div>
      <div>
        <ul className='flex gap-4'>
          <li className='font-bold  text-xl relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:bg-yellow-600/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer'>
            <a href='' className='text-gray-100 no-underline'>
              Login
            </a>
          </li>
          <li className='font-bold text-xl relative text-clip bg-clip-text transform-gpu transition-all before:content-[""] before:absolute before:left-0 before:right-0 before:h-1 before:bg-yellow-600/60 before:bottom-0 before:transition-all hover:before:translate-y-2 cursor-pointer no-underline'>
            <a href='' className='text-gray-100 hover:no-underline'>
              Sobre nós
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
