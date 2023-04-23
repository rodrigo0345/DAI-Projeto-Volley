import { getPost } from 'Frontend/generated/PostController';
import { findById } from 'Frontend/generated/UserController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [news, setNews] = useState<News | undefined>(undefined);
  const [rides, setRides] = useState<Ride | undefined>(undefined); // [1
  const [author, setAuthor] = useState<LoginUser | undefined>(undefined); // [1

  useEffect(() => {
    (async () => {
      const post = await getPost(type, Number.parseInt(id ?? '0'));
      if (type === 'news') {
        setNews(post?.news);
        const author = await findById(post?.news?.authorID ?? 0);
        setAuthor(author);
      } else if (type === 'ride') {
        setRides(post?.ride);
        const author = await findById(post?.ride?.driverID ?? 0);
        setAuthor(author);
      } // [2]
    })();
  }, []);

  return (
    <div className='h-screen z-10 bg-white relative'>
      <article className='max-w-2xl px-6 py-24 mx-auto space-y-16 dark:bg-gray-800 dark:text-gray-50'>
        <div className='w-full mx-auto space-y-4'>
          <h1 className='text-5xl font-bold leading-none'>
            {news && news.title}{' '}
            {rides && rides.origin + ' to ' + rides.destination}
          </h1>
          <div className='flex flex-wrap space-x-2 text-sm dark:text-gray-400'>
            <a
              rel='noopener noreferrer'
              href='#'
              className='p-1 hover:underline'
            >
              {news && '#News'}
              {rides && '#Rides'}
            </a>
          </div>
          <p className='text-sm dark:text-gray-400'>
            Criado por{' '}
            <a
              href={news && '/profiles/' + (news?.authorID ?? '')}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline dark:text-violet-400'
            >
              <span>{author?.firstname + ' ' + author?.lastname}</span>
            </a>{' '}
            a{' '}
            <time dateTime='2021-02-12 15:34:18-0200'>
              {news && format(new Date(news.createdAt ?? ''), 'dd MMMM yyyy')}
            </time>
          </p>
        </div>
        <div className='dark:text-gray-100'>
          <p>
            {news && news.content}
            {rides && rides.description}
          </p>
        </div>
      </article>
    </div>
  );
}
