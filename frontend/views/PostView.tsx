import { UserContext } from 'Frontend/contexts/UserContext';
import { editPost, getPost } from 'Frontend/generated/PostController';
import { findById } from 'Frontend/generated/UserController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { format } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
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

  const noticia = {
    titulo: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    imagem: useRef<HTMLInputElement>(null),
  };

  const boleia = {
    destino: useRef<HTMLInputElement>(null),
    dataPartida: useRef<HTMLInputElement>(null),
    lugaresDisp: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    telefone: useRef<HTMLInputElement>(null),
    localPartida: useRef<HTMLInputElement>(null),
  };

  async function submitChanges(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    console.log(type);
    const postType: PostType = {};
    if (type === 'news') {
      postType.news = {
        title: noticia?.titulo?.current?.value,
        content: noticia?.descricao?.current?.value,
        authorID: news?.authorID ?? 0,
        id: news?.id,
        clicks: news?.clicks ?? 0,
        image: undefined,
        likes: news?.likes ?? 0,
        createdAt: news?.createdAt ?? '',
      };

      const result = await editPost(postType, user);
    } else if (type === 'ride') {
      postType.ride = {
        origin: boleia?.localPartida?.current?.value,
        destination: boleia?.destino?.current?.value,
        startDate: boleia?.dataPartida?.current?.value,
        description: boleia?.descricao?.current?.value,
        driverID: rides?.driverID ?? 0,
        id: rides?.id,
        freeSeats: rides?.freeSeats ?? 0,
        driverContact: boleia?.telefone?.current?.value,
        seats: Number.parseInt(boleia?.lugaresDisp?.current?.value ?? '0'),
        clicks: rides?.clicks ?? 0,
      };
      const result = await editPost(postType, user);
    }
  }

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

        console.log('Here');
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
      <article className='max-w-2xl px-6 py-24 mx-auto space-y-8 dark:bg-gray-800 dark:text-gray-50'>
        <div className='w-full mx-auto space-y-4'>
          <div className='flex items-center justify-between my-8'>
            {
              <input
                ref={(news && noticia.titulo) || (rides && boleia.destino)}
                className={`text-5xl font-bold leading-none m-0 h-fit bg-white outline outline-1  border-none rounded-md focus:ring-transparent p-0 ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                onChange={(e) => setTitleState(e.target.value)}
                value={titleState}
                {...(editable ? { disabled: false } : { disabled: true })}
              ></input>
            }

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
              {rides && format(new Date(rides.createdAt ?? ''), 'dd MMMM yyyy')}
            </time>
          </p>
        </div>
        {rides && (
          <div className='flex gap-4 flex-col py-0 m-0 pt-0'>
            <div className='flex items-center'>
              <p className='m-0 pr-2 text-sm'> Lugares disponíveis: </p>
              <input
                className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 font-semibold text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='number'
                value={rides.seats}
              />
            </div>
            <div className='flex items-center'>
              <p className='m-0 pr-2 text-sm'> Lugares ocupados: </p>
              <input
                className={`outline outline-1  border-none rounded-md focus:ring-transparent font-semibold p-0 text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='number'
                value={rides.seats - rides.freeSeats}
              />
            </div>
            <div className='flex items-center text-sm'>
              <p className='m-0 pr-2 text-sm'> Hora e dia: </p>
              <input
                className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 font-semibold text-sm ${
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
        <hr />
        <div className='dark:text-gray-100 h-fit' contentEditable={true}>
          <textarea
            ref={(news && noticia.descricao) ?? (rides && boleia.descricao)}
            className={`resize-none outline outline-1 w-full overflow-visible border-none rounded-md focus:ring-transparent p-0 font-semibold text-ellipsis h-[20em] ${
              editable
                ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                : 'outline-none focus:outline-none focus:border-none'
            }`}
            value={contentState}
            {...(editable ? { disabled: false } : { disabled: true })}
            onChange={(e) => {
              setContentState(e.target.value);
            }}
          />
        </div>
        {editable && (
          <button
            className='bg-green-400 text-white font-bold py-1 px-3 rounded-md shadow-lg hover:bg-green-500'
            title='Guardar alterações'
            onClick={submitChanges}
          >
            Guardar
          </button>
        )}
      </article>
    </div>
  );
}
