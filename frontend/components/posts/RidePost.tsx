import { findById } from 'Frontend/generated/UserController';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import { format, formatDistanceToNow, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import World from 'Frontend/assets/svgs/world.svg';

export function RidePost({ post, type }: { post?: Ride; type?: string }) {
  const [driver, setDriver] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const driver = await findById(post?.driverID);
      setDriver(driver?.firstname + ' ' + driver?.lastname);
    })();
  });
  return (
    <>
      {isBefore(Date.parse(post?.startDate ?? ''), Date.now()) && (
        <motion.div
          key={post?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='relative bg-zinc-800 w-full min-h-[15em] rounded-lg shadow-lg overflow-hidden outline outline-1 outline-gray-300 py-4 max-h-[20em] shadow-gray-400 max-w-[60em] text-white'
        >
          <div
            className='flex items-start px-4 justify-between cursor-pointer'
            onClick={() => {
              window.location.href = '/post/ride/' + post?.id;
            }}
          >
            <h3 className='font-bold text-center m-0 text-lg text-white'>
              {post?.destination}{' '}
              <span className='text-sm font-normal italic'>
                {' @' + 'Boleia'}
              </span>
              <span className='font-normal text-sm italic block text-left'>
                {formatDistanceToNow(Date.parse(post?.startDate ?? ''), {
                  addSuffix: true,
                })}
              </span>
            </h3>
            <p className=' text-gray-300 font-semibold text-sm '>
              {format(Date.parse(post?.createdAt ?? ''), 'dd/MM/yyyy')}
            </p>
          </div>
          <div className='px-4 pb-2 text-gray-200'>
            <p>Condutor: {driver}</p>
          </div>
          <img
            width={300}
            className='w-full'
            src={World}
            alt='imagem do post'
          />
          <div className='h-10 w-full bg-gradient-to-t from-zinc-800 absolute bottom-10'></div>
          <div className='px-4 h-10 w-full bg-zinc-800 absolute bottom-0 flex items-center'>
            {!type && (
              <BsBookmark
                aria-label='save'
                onClick={() => {
                  //savePost(1);
                }}
                size={20}
              ></BsBookmark>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
