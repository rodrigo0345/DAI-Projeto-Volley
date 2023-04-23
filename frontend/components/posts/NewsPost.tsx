import {
  addLike,
  getLikes,
  remove,
  removeLike,
} from 'Frontend/generated/NewsController';
import News from 'Frontend/generated/com/example/application/model/News/News';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

export function NewsPost({
  post,
  type,
  currentUserID,
}: {
  post?: News;
  type?: string;
  currentUserID?: number;
}) {
  const [likes, setLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [justMounted, setJustMounted] = useState<boolean>(true);

  useEffect(() => {
    // get likes from the server
    (async () => {
      const likes = await getLikes(post?.id ?? 0);
      setLikes(likes ?? 0);
    })();
    setJustMounted(false);
  }, []);

  useEffect(() => {
    if (justMounted) return;
    if (userLiked) {
      console.log('user liked');
      (async () => {
        // send like to the server
        await addLike(post?.id ?? 0);
        setLikes(likes + 1);
      })();
    } else {
      (async () => {
        // send like to the server
        await removeLike(post?.id ?? 0);
        setLikes(likes - 1);
      })();
    }
  }, [userLiked]);

  return (
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
          window.location.href = '/post/news/' + post?.id;
        }}
      >
        <h3 className='font-bold text-center m-0 text-lg text-white'>
          {post?.title}{' '}
          <span className='text-sm font-normal italic'>{' @' + 'Notícia'}</span>
          <span className='font-normal text-sm italic block text-left'>
            {formatDistanceToNow(Date.parse(post?.createdAt ?? ''), {
              addSuffix: true,
            })}
          </span>
        </h3>
        <p className=' text-gray-300 font-semibold text-sm '>
          {format(Date.parse(post?.createdAt ?? ''), 'dd/MM/yyyy')}
        </p>
      </div>
      <div className='px-4 pb-2 text-gray-200'>
        <p>{post?.content}</p>
      </div>
      <img
        width={300}
        className='w-full'
        src={
          'https://cdn.record.pt/images/2019-08/img_920x518$2019_08_21_09_09_07_1591075.jpg'
        }
        alt='imagem do post'
      />
      <div className='h-10 w-full bg-gradient-to-t from-zinc-800 absolute bottom-10'></div>
      <div className='px-4 h-10 w-full bg-zinc-800 absolute bottom-0 flex items-center gap-2 justify-between'>
        <div
          className='flex gap-1 items-center cursor-pointer'
          onClick={() => {
            setUserLiked(!userLiked);
          }}
        >
          {likes}
          {userLiked ? (
            <MdFavorite color='yellow' size={20}></MdFavorite>
          ) : (
            <MdFavoriteBorder aria-label='save' size={20}></MdFavoriteBorder>
          )}
        </div>
        {currentUserID === post?.authorID && (
          <button
            onClick={() => {
              (async () => {
                await remove(post);
                // refresh
                window.location.reload();
              })();
            }}
            className='bg-red-500 p-1 rounded-md hover:bg-red-600'
            title='Eliminar Post'
          >
            Eliminar
          </button>
        )}
      </div>
    </motion.div>
  );
}
