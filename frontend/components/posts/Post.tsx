import React from 'react';
import { BsBookmark } from 'react-icons/bs';
import { toast } from 'react-toastify';

export type Content = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

function savePost(id: number) {
  // add post to user's saved posts

  toast.success('Post guardado com sucesso!');
}

export default function Post({ type }: { type?: string }) {
  return (
    <div className='relative bg-zinc-800 w-full min-h-[15em] rounded-lg shadow-lg overflow-hidden outline outline-1 outline-gray-300 py-4 cursor-pointer max-h-[20em] shadow-gray-400 max-w-[60em] text-white'>
      <div className='flex items-start px-4 justify-between'>
        <h3 className='font-bold text-center m-0 text-lg text-white'>
          Titulo{' '}
          <span className='text-sm font-normal italic'>{' @' + 'tipo'}</span>
          <span className='font-normal text-sm italic'>
            {' / ' + 'Há 14 horas'}
          </span>
        </h3>
        <p className=' text-gray-300 font-semibold text-sm '>12/02/2022</p>
      </div>
      <div className='px-4 pb-2 text-gray-200'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          ducimus nemo molestiae nobis? Ea repellat quam esse, eum eos ducimus
          exercitationem aut quibusdam repellendus laborum, delectus illo est
          nobis amet.
        </p>
      </div>
      <img
        width={300}
        className='w-full'
        src='https://cdn.record.pt/images/2019-08/img_920x518$2019_08_21_09_09_07_1591075.jpg'
        alt='imagem do post'
      />
      <div className='h-10 w-full bg-gradient-to-t from-zinc-800 absolute bottom-10'></div>
      <div className='px-4 h-10 w-full bg-zinc-800 absolute bottom-0 flex items-center'>
        {!type && (
          <BsBookmark
            aria-label='save'
            onClick={() => {
              savePost(1);
            }}
            size={20}
          ></BsBookmark>
        )}
      </div>
    </div>
  );
}
