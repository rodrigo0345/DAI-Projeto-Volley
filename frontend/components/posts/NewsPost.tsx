import { findById } from 'Frontend/generated/UserController';
import News from 'Frontend/generated/com/example/application/model/News/News';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { memo, startTransition, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import news from 'Frontend/assets/svgs/news.svg';
import AlertDialogs from '../alertDialog/AlertDialog';
import {
  addLike,
  checkUserHasLiked,
  getLikes,
  remove,
  removeLike,
} from 'Frontend/generated/NewsController';
import { toast } from 'react-toastify';

const NewsPost = ({
  post,
  type,
  user,
}: {
  post?: News;
  type?: string;
  user?: LoginUser;
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [author, setAuthor] = useState<LoginUser | undefined>();
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // get likes from the server
    (async () => {
      const likes = await getLikes(post?.id ?? 0);
      setLikes(likes ?? 0);
      const userLiked = await checkUserHasLiked(post, user);
      setUserLiked(userLiked);
      try {
        const author = await findById(post?.authorID ?? 0);
        if (author?.body.error || !author) {
          await remove(post);
          return;
        }
        setAuthor(author?.body.success);
      } catch (e) {
        console.log(e);
        await remove(post);
        return;
      }
      // this means the post is not associated with a user
    })();

    (async () => {
      if (!post?.image) return;
      const blob = new Blob([new Uint8Array(post?.image)], {
        type: 'image/*',
      });
      setImage(URL.createObjectURL(blob));
    })();
  }, []);

  async function likePost() {
    if (!userLiked) {
      const result = await addLike({ news: post }, user);
      if (result?.body?.error) {
        toast.error(result?.body?.error);
        return;
      }
      setLikes(likes + 1);
      setUserLiked(true);
    } else {
      const result = await removeLike({ news: post }, user);
      if (result?.body?.error) {
        toast.error(result?.body?.error);
        return;
      }
      setLikes(likes - 1);
      setUserLiked(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      className=' flex items-center justify-center'
    >
      <div className='flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-xl bg-zinc-100 text-gray-100 max-w-[30em] md:min-w-[30em] w-full'>
        <div className='flex space-x-4'>
          <div className='flex flex-col space-y-1'>
            <a
              href={'/profiles/' + post?.authorID}
              className='text-sm font-semibold text-yellow-400'
            >
              {author?.firstname + ' ' + author?.lastname}
            </a>
            <span className='text-xs text-gray-400'>
              {formatDistanceToNow(Date.parse(post?.createdAt ?? '24/4/2023'), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            window.location.href = '/post/news/' + post?.id;
          }}
        >
          <img
            width={300}
            loading='lazy'
            onError={(e) => {
              e.currentTarget.src = news;
            }}
            src={image ?? news}
            alt=''
            className='object-contain w-full mb-4 h-60 sm:h-96 bg-amber-50'
          />
          <h2 className='mb-1 text-xl font-semibold text-gray-800'>
            {post?.title}
          </h2>
          <p className='text-sm text-gray-800'>{post?.content}</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='space-x-2 flex items-center'>
            {user?.id === post?.authorID && (
              <AlertDialogs
                customMessage='Apagar um post é uma ação irreversível, tem a certeza de que deseja continuar?'
                customFunction={async () => {
                  await remove(post);
                  // refresh
                  window.location.reload();
                }}
              >
                <button
                  className=' rounded-md text-gray-400 hover:text-red-400'
                  title='Eliminar Post'
                >
                  <AiOutlineDelete size={20}></AiOutlineDelete>
                </button>
              </AlertDialogs>
            )}
          </div>
          <div className='flex space-x-2 text-sm text-gray-400'>
            <button
              type='button'
              className='flex items-center p-1 space-x-1.5 hover:text-yellow-400'
              onClick={() => {
                likePost();
              }}
            >
              {userLiked ? (
                <MdFavorite color='facc15' size={20}></MdFavorite>
              ) : (
                <MdFavoriteBorder
                  aria-label='save'
                  size={20}
                ></MdFavoriteBorder>
              )}
              <span>{likes}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(NewsPost);
