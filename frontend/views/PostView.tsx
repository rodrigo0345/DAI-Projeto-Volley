import { UserContext } from 'Frontend/contexts/UserContext';
import { getPost } from 'Frontend/generated/PostController';
import { findById } from 'Frontend/generated/UserController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostView() {
  const { user } = useContext(UserContext);
  const { id, type } = useParams<{ id: string; type: string }>();
  const [news, setNews] = useState<News | undefined>(undefined);
  const [rides, setRides] = useState<Ride | undefined>(undefined); // [1
  const [author, setAuthor] = useState<LoginUser | undefined>(undefined); // [1
  const [editable, setEditable] = useState(false);

  const [titleState, setTitleState] = useState<string | undefined>(undefined);
  const [contentState, setContentState] = useState<string | undefined>(
    undefined
  );
  const [myPost, setMyPost] = useState(false);

  useEffect(() => {
    (async () => {
      let post: PostType | undefined;
      try {
        post = await getPost(type, Number.parseInt(id ?? '0'));
      } catch (e: any) {
        toast.error(e.message);
      }

      if (type === 'news') {
        setNews(post?.news);
        setMyPost(user?.id === post?.news?.authorID);

        const title = post?.news?.title;
        const content = post?.news?.content;
        setContentState(content);
        setTitleState(title);

        const author = await findById(post?.news?.authorID ?? 0);
        setAuthor(author);
      } else if (type === 'ride') {
        setRides(post?.ride);
        setMyPost(user?.id === post?.ride?.driverID);

        const title = post?.ride?.origin + ' - ' + post?.ride?.destination;
        const content = post?.ride?.description;
        setContentState(content);
        setTitleState(title);

        const author = await findById(post?.ride?.driverID ?? 0);
        setAuthor(author);
      } // [2]
    })();
  }, []);
  //
  return (
    <div className='h-screen z-10 bg-white relative shadow-lg'>
      <article className='max-w-2xl px-6 py-24 mx-auto space-y-16 dark:bg-gray-800 dark:text-gray-50'>
        <div className='w-full mx-auto space-y-4'>
          <div className='flex items-center justify-between my-8 gap-4'>
            <input
              className={`text-5xl font-bold leading-none m-0 bg-white outline outline-1  border-none rounded-md focus:ring-transparent p-0 ${
                editable
                  ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                  : 'outline-none focus:outline-none focus:border-none'
              }`}
              value={titleState}
              {...(editable ? { disabled: false } : { disabled: true })}
            ></input>
            <button
              className='m-0 bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded-md shadow-lg'
              onClick={() => {
                setEditable((editable) => !editable);
              }}
            >
              Editar
            </button>
          </div>
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
              href={
                (news && '/profiles/' + (news?.authorID ?? '')) ||
                (rides && '/profiles/' + (rides?.driverID ?? ''))
              }
              className='hover:underline dark:text-violet-400'
            >
              <span>{author?.firstname + ' ' + author?.lastname}</span>
            </a>{' '}
            a{' '}
            <time>
              {news && format(new Date(news.createdAt ?? ''), 'dd MMMM yyyy')}
            </time>
          </p>
        </div>
        <div className='dark:text-gray-100'>
          <input
            className={`outline outline-1 w-full border-none rounded-md focus:ring-transparent p-0 h-fit ${
              editable
                ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                : 'outline-none focus:outline-none focus:border-none'
            }`}
            type='text'
            value={contentState}
            {...(editable ? { disabled: false } : { disabled: true })}
            onChange={(e) => {
              setContentState(e.target.value);
            }}
          />
          {rides && (
            <div className='flex gap-4 flex-col py-8'>
              <div className='flex items-center'>
                <p className='m-0 pr-2'> Lugares disponíveis: </p>
                <input
                  className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 ${
                    editable
                      ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                      : 'outline-none focus:outline-none focus:border-none'
                  }`}
                  type='number'
                  value={rides.seats}
                />
              </div>
              <div className='flex items-center'>
                <p className='m-0 pr-2'> Lugares ocupados: </p>
                <input
                  className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 ${
                    editable
                      ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                      : 'outline-none focus:outline-none focus:border-none'
                  }`}
                  type='number'
                  value={rides.seats - rides.freeSeats}
                />
              </div>
              <div className='flex items-center'>
                <p className='m-0 pr-2'> Hora e dia: </p>
                <input
                  className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 ${
                    editable
                      ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                      : 'outline-none focus:outline-none focus:border-none'
                  }`}
                  type='datetime-local'
                  value={rides.startDate}
                />
              </div>
            </div>
          )}
        </div>
        {editable && (
          <button
            className='bg-green-400 text-white font-bold py-1 px-3 rounded-md shadow-lg hover:bg-green-500'
            title='Guardar alterações'
          >
            Guardar
          </button>
        )}
      </article>
    </div>
  );
}
