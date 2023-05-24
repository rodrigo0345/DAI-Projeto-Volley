import Logo from 'Frontend/assets/images/Logo-512x512-1.png';

export default function mainFooter() {
  return (
    <section className='py-10 bg-gray-50 sm:pt-16 lg:pt-24 sticky bottom-0 pb-8'>
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12'>
          <div className='col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8'>
            <img className='w-auto h-9' src={Logo} alt='Vitória de Guimarães' />

            <p className='text-base leading-relaxed text-gray-600 mt-7'>
              Aplicação desenvolvida no âmbito da unidade curricular de
              Desenvolvimento de Aplicações Informáticas.
            </p>

            <ul className='flex items-center space-x-3 mt-9'>
              <li>
                <a
                  href='https://twitter.com/VitoriaSC1922?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
                  title='Twitter'
                  target='_blank'
                  className='flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-yellow-400 focus:bg-yellow-500'
                >
                  <svg
                    className='w-4 h-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z'></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href='https://www.facebook.com/vitoriasportclube'
                  target='_blank'
                  title='Facebook'
                  className='flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-yellow-400 focus:bg-yellow-500'
                >
                  <svg
                    className='w-4 h-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z'></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href='https://www.instagram.com/vitoriasc_oficial/'
                  title='Instagram'
                  target='_blank'
                  className='flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-yellow-400 focus:bg-yellow-500'
                >
                  <svg
                    className='w-4 h-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z'></path>
                    <circle cx='16.806' cy='7.207' r='1.078'></circle>
                    <path d='M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z'></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              Contactos
            </p>

            <ul className='mt-6 space-y-4'>
              <li>
                <a
                  href='https://goo.gl/maps/G1G7gREh29HCvEQZ8'
                  target='_blank'
                  title='Localização'
                  className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                >
                  {' '}
                  Localização{' '}
                </a>
              </li>

              <li>
                <a
                  href='tel:+351253432570'
                  title='Telefone'
                  className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                >
                  {' '}
                  Telefone{' '}
                </a>
              </li>

              <li>
                <a
                  href='mailto:geral@vitoriasc.pt'
                  title=''
                  className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                >
                  {' '}
                  Email{' '}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              Newsletter
            </p>

            <a
              className='mt-6 p-2 bg-yellow-300 hover:bg-yellow-400 text-white rounded-md cursor-pointer decoration-none shadow-lg'
              href='https://personalising.typeform.com/vitoriaregisto'
            >
              Subscrever
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
