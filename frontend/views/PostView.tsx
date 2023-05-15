import { UserContext } from 'Frontend/contexts/UserContext';
import { addClick, editPost, getPost } from 'Frontend/generated/PostController';
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
  const [passengers, setPassengers] = useState<LoginUser[]>([]);

  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [dataPartida, setDataPartida] = useState<string | undefined>(undefined);
  const [lugaresDisp, setLugaresDisp] = useState<number | undefined>(undefined);
  const [lugaresOcup, setLugaresOcup] = useState<number | undefined>(undefined);
  const [driverContact, setDriverContact] = useState<string | undefined>(
    undefined
  );

  const noticia = {
    titulo: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    imagem: useRef<HTMLInputElement>(null),
  };

  const boleia = {
    destino: useRef<HTMLInputElement>(null),
    dataPartida: useRef<HTMLInputElement>(null),
    lugaresDisp: useRef<HTMLInputElement>(null),
    lugaresOcup: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    telefone: useRef<HTMLInputElement>(null),
    localPartida: useRef<HTMLInputElement>(null),
  };

  async function submitChanges(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const postType: PostType = {};
    if (type === 'news') {
      postType.news = {
        title: noticia?.titulo?.current?.value,
        content: noticia?.descricao?.current?.value,
        authorID: news?.authorID ?? 0,
        id: news?.id,
        clicks: news?.clicks ?? 0,
        image: news?.image,
        likes: news?.likes ?? 0,
        createdAt: news?.createdAt ?? '',
      };
    } else if (type === 'ride') {
      postType.ride = {
        createdAt: rides?.createdAt ?? '',
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
    }

    const result = await editPost(postType, user);
    if (result?.body.error) {
      toast.error(result?.body.error);
      return;
    }

    setEditable(false);
    toast.success('Post editado com sucesso!');
  }

  useEffect(() => {
    (async () => {
      let post: PostType | undefined;
      try {
        post = await getPost(type, Number.parseInt(id ?? '0'));
      } catch (e: any) {
        toast.error(e.message);
      }

      if (!post) {
        toast.error('Post not found');
        window.location.href = '/forum';
        return;
      }

      if (type === 'news') {
        setNews(post?.news);
        setMyPost(user?.id === post?.news?.authorID);

        const title = post?.news?.title;
        const content = post?.news?.content;
        setContentState(content);
        setTitleState(title);

        const author = await findById(post?.news?.authorID ?? 0);
        setAuthor(author?.body.success);
      } else if (type === 'ride') {
        setRides(post?.ride);
        setMyPost(user?.id === post?.ride?.driverID);

        // fetch all passangers
        setPassengers([]);
        post?.ride?.passengers?.forEach(async (passenger) => {
          const passengerUser = await findById(passenger);
          setPassengers((passengers) => [
            ...passengers,
            passengerUser?.body.success ?? {},
          ]);
        });

        const title = post?.ride?.origin;
        const content = post?.ride?.description;
        setContentState(content);
        setTitleState(title);
        setDestination(post?.ride?.destination);
        setDataPartida(post?.ride?.startDate ?? '04/06/2020');
        setLugaresDisp(post?.ride?.seats);
        setLugaresOcup((post?.ride?.seats ?? 0) - (post?.ride?.freeSeats ?? 0));
        setDriverContact(post?.ride?.driverContact);

        const author = await findById(post?.ride?.driverID ?? 0);
        setAuthor(author?.body.success);
      }

      addClick(post); // [2]
    })();
  }, []);
  //
  return (
    <div className='h-screen z-10 bg-white relative shadow-lg'>
      <article className='max-w-2xl px-6 py-24 mx-auto space-y-8 '>
        <div className='w-full mx-auto space-y-4 relative'>
          <a className='m-0 decoration-slate-700' href='/forum'>
            Voltar ao fórum
          </a>
          <div className='flex items-center justify-between max-w-full'>
            <div>
              <input
                ref={(news && noticia.titulo) || (rides && boleia.localPartida)}
                className={`text-5xl font-bold leading-none m-0 h-fit bg-white outline outline-1  border-none rounded-md focus:ring-transparent p-0 w-60 ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                onChange={(e) => setTitleState(e.target.value)}
                value={titleState}
                {...(editable ? { disabled: false } : { disabled: true })}
              ></input>
              {rides && (
                <input
                  type='text'
                  value={destination ?? ''}
                  ref={boleia.destino}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`text-5xl font-bold leading-none m-0 h-fit bg-white outline outline-1  border-none rounded-md focus:ring-transparent p-0 w-60 ${
                    editable
                      ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                      : 'outline-none focus:outline-none focus:border-none'
                  }`}
                />
              )}
            </div>
            {((news && user?.id === news.authorID) ||
              (rides && user?.id === rides?.driverID)) && (
              <button
                className='m-0 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md shadow-lg'
                onClick={() => {
                  setEditable((editable) => !editable);
                }}
              >
                Editar
              </button>
            )}
          </div>
          <div className='flex flex-wrap space-x-2 text-sm '>
            <a
              rel='noopener noreferrer'
              href='#'
              className='p-1 hover:underline'
            >
              {news && '#News'}
              {rides && '#Rides'}
            </a>
          </div>
          <p className='text-sm'>
            Criado por{' '}
            <a
              href={
                (news && '/profiles/' + (news?.authorID ?? '')) ||
                (rides && '/profiles/' + (rides?.driverID ?? ''))
              }
              className='hover:underline '
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
                ref={boleia.lugaresDisp}
                className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 font-semibold text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='number'
                onChange={(e) => {
                  setLugaresDisp(Number(e.target.value));
                }}
                value={lugaresDisp}
                {...(editable ? { disabled: false } : { disabled: true })}
              />
            </div>
            <div className='flex items-center'>
              <p className='m-0 pr-2 text-sm'> Lugares ocupados: </p>
              <input
                ref={boleia.lugaresOcup}
                className={`outline outline-1  border-none rounded-md focus:ring-transparent font-semibold p-0 text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='number'
                onChange={(e) => {
                  setLugaresOcup(Number(e.target.value));
                }}
                value={lugaresOcup}
                disabled={true}
              />
            </div>
            <div className='flex items-center'>
              <p className='m-0 pr-2 text-sm'> Contacto: </p>
              <input
                ref={boleia.telefone}
                className={`outline outline-1  border-none rounded-md focus:ring-transparent font-semibold p-0 text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='number'
                onChange={(e) => {
                  setDriverContact(e.target.value);
                }}
                value={driverContact}
                {...(editable ? { disabled: false } : { disabled: true })}
              />
            </div>
            <div className='flex items-center text-sm'>
              <p className='m-0 pr-2 text-sm'> Hora e dia: </p>
              <input
                ref={boleia.dataPartida}
                className={`outline outline-1  border-none rounded-md focus:ring-transparent p-0 font-semibold text-sm ${
                  editable
                    ? 'focus:outline-1 focus:outline-offset-0 focus:outline-green-500 outline-green-500 focus:border-none p-2'
                    : 'outline-none focus:outline-none focus:border-none'
                }`}
                type='datetime-local'
                onChange={(e) => {
                  setDataPartida(e.target.value);
                }}
                value={dataPartida}
                {...(editable ? { disabled: false } : { disabled: true })}
              />
            </div>
            <div className='flex items-center text-sm'>
              <p className='m-0 pr-2 text-sm'> Passageiros: </p>
              {passengers.length !== 0 ? (
                passengers.map((passenger) => (
                  <a
                    href={'/profiles/' + passenger.id}
                    className='hover:underline mr-2'
                  >
                    <span className='m-0 pr-2 text-sm'>
                      {passenger.firstname + ' ' + passenger.lastname}
                    </span>
                  </a>
                ))
              ) : (
                <span className='m-0 pr-2 text-sm'>Sem passageiros</span>
              )}
            </div>
          </div>
        )}
        <hr />
        <div className=' h-fit' contentEditable={true}>
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
