import SidePanel, {
  AsideContent,
} from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsCalendarDate, BsCarFront, BsCloudUpload } from 'react-icons/bs';
import { MdOutlineForum } from 'react-icons/md';
import { ImNewspaper } from 'react-icons/im';
import * as Select from '@radix-ui/react-select';
import * as Tabs from '@radix-ui/react-tabs';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { TfiWrite } from 'react-icons/tfi';
import { Subscription } from '@hilla/frontend';
import { PostController } from 'Frontend/generated/endpoints';
import { PostComponent } from 'Frontend/components/posts/Post';
import News from 'Frontend/generated/com/example/application/model/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import ModalBox from 'Frontend/components/modalBox/ModalBox';
import Dropzone, { DropzoneRef } from 'react-dropzone';
import { toast } from 'react-toastify';
import {
  popularPosts,
  postsByNewest,
  postsByOlder,
} from 'Frontend/generated/PostController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import { NewsPost } from 'Frontend/components/posts/NewsPost';
import { Button, Skeleton } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import ResponseEntity from 'Frontend/generated/org/springframework/http/ResponseEntity';
import searching from 'Frontend/assets/svgs/searching.svg';

enum Menu {
  ALL = 'ALL',
  NEWS = 'NEWS',
  RIDES = 'RIDES',
}

export default function ForumView() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState<Menu>(Menu.ALL);
  const [posts, setPosts] = useState<(PostType | undefined)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<string>('popular');
  const [currIndex, setCurrIndex] = useState(0);

  const noticia = {
    titulo: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    imagem: useRef<HTMLInputElement>(null),
  };

  const [imagem, setImagem] = useState<any>(null);

  async function criarNoticia() {
    const titulo = noticia.titulo.current?.value;
    const descricao = noticia.descricao.current?.value;
    const imagem = noticia.imagem.current?.value;

    if (!(titulo && descricao)) {
      toast.error('Preencha todos os campos');
      return;
    }

    let serverResult: ResponseEntity | undefined;
    try {
      serverResult = await PostController.createPost('news', {
        news: {
          title: titulo,
          clicks: 0,
          authorID: user?.id,
          content: descricao,
          createdAt: '',
          id: 0,
        },
      });
    } catch (e: any) {
      toast.error(e.message);
      return;
    }

    if (serverResult?.body.error) {
      toast.error(serverResult?.body.error);
      return;
    }
    toast.success('Notícia criada com sucesso');

    setOpenModal(false);
  }

  const boleia = {
    destino: useRef<HTMLInputElement>(null),
    dataPartida: useRef<HTMLInputElement>(null),
    lugaresDisp: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    telefone: useRef<HTMLInputElement>(null),
    localPartida: useRef<HTMLInputElement>(null),
  };

  async function criarBoleia() {
    const destino = boleia.destino.current?.value;
    const dataPartida = boleia.dataPartida.current?.value;
    const lugaresDisp = boleia.lugaresDisp.current?.value;
    const descricao = boleia.descricao.current?.value;
    const telefone = boleia.telefone.current?.value;
    const localPartida = boleia.localPartida.current?.value;

    if (!(destino && dataPartida && lugaresDisp && descricao && telefone)) {
      toast.error('Preencha todos os campos');
      return;
    }

    let serverResult: ResponseEntity | undefined;
    try {
      serverResult = await PostController.createPost('ride', {
        ride: {
          destination: destino,
          freeSeats: Number(lugaresDisp),
          clicks: 0,
          startDate: dataPartida,
          seats: Number(lugaresDisp),
          driverContact: telefone,
          description: descricao,
          driverID: user?.id,
          location: localPartida,
          passengers: undefined,
        },
      });
    } catch (e: any) {
      toast.error(e.message);
      return;
    }

    if (serverResult?.body.error) {
      toast.error(serverResult?.body.error);
      return;
    }

    toast.success('Boleia criada com sucesso');
  }

  async function fetchPopularPosts(
    index: number,
    prevPosts?: (PostType | undefined)[]
  ) {
    const posts = await popularPosts(8, index);
    if (!posts || posts.length === 0) {
      toast.warn('Não existem mais posts');
      setLoading(false);
      return;
    }
    setPosts([...(prevPosts ?? []), ...posts]);
  }

  async function fetchPostsByMostRecent(
    index: number,
    prevPosts?: (PostType | undefined)[]
  ) {
    const posts = await postsByNewest(8, index);
    if (!posts) {
      toast.warn('Não existem mais posts');
      setLoading(false);
      return;
    }
    setPosts([...(prevPosts ?? []), ...posts]);
  }

  async function fetchPostsByOldest(
    index: number,
    prevPosts?: (PostType | undefined)[]
  ) {
    const posts = await postsByOlder(8, index);
    if (!posts) {
      toast.warn('Não existem mais posts');
      setLoading(false);
      return;
    }

    setPosts([...(prevPosts ?? []), ...posts]);
  }

  useEffect(() => {
    setOrder('relevante');
    setCurrIndex(0);
    (async () => {
      await fetchPopularPosts(0);
    })();
  }, [menu]);

  useEffect(() => {
    console.log(order);
    setCurrIndex(0);
    (async () => {
      setLoading(true);
      if (order === 'relevante') {
        await fetchPopularPosts(0);
      } else if (order === 'recente') {
        await fetchPostsByMostRecent(0);
      } else if (order === 'antigo') {
        await fetchPostsByOldest(0);
      }
      setLoading(false);
    })();
  }, [order]);

  useEffect(() => {
    // cria uma conexão com o backend para receber os posts
    if (posts.length > 0) return;

    (async () => {
      setLoading(true);
      if (menu === Menu.ALL) await fetchPopularPosts(0);
      else if (menu === Menu.NEWS) await fetchPopularPosts(0);
      else await fetchPopularPosts(0);
      setLoading(false);
    })();
  }, []);

  async function loadMore() {
    const newIndex = currIndex + 1;
    setCurrIndex(newIndex);

    if (order === 'relevante') {
      await fetchPopularPosts(newIndex, posts);
    } else if (order === 'recente') {
      await fetchPostsByMostRecent(newIndex, posts);
    } else if (order === 'antigo') {
      await fetchPostsByOldest(newIndex, posts);
    }
  }

  const content: AsideContent<Menu>[] = [
    {
      id: 0,
      text: 'Todos os posts',
      icon: (
        <MdOutlineForum
          color={menu === Menu.ALL ? 'white' : 'black'}
          size={20}
        ></MdOutlineForum>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.ALL,
      link: '/all',
    },
    {
      id: 1,
      text: 'Boleias',
      icon: (
        <BsCarFront
          color={menu === Menu.RIDES ? 'white' : 'black'}
          size={20}
        ></BsCarFront>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.RIDES,
      link: '/calendar',
    },
    {
      id: 2,
      text: 'Notícias',
      icon: (
        <ImNewspaper
          color={menu === Menu.NEWS ? 'white' : 'black'}
          size={20}
        ></ImNewspaper>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.NEWS,
      link: '/calendar',
    },
    // adicionar novos menus é aqui
  ];

  return (
    <div className='min-h-screen flex relative'>
      <ModalBox openModal={openModal} setOpenModal={setOpenModal}>
        <Tabs.Root
          className='m-auto relative !max-w-[45em] lg:max-w-[50em] md:!w-[25em] w-full overflow-x-hidden shadow-lg rounded-lg z-[100]'
          defaultValue='tab1'
        >
          <Tabs.List
            className='shrink-0 flex border-b '
            aria-label='Manage your account'
          >
            <Tabs.Trigger
              className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-yellow-300 data-[state=active]:text-yellow-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-transparent outline-none cursor-default focus:border-none'
              value='tab1'
            >
              Boleia
            </Tabs.Trigger>
            <Tabs.Trigger
              className='bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-yellow-300 data-[state=active]:text-yellow-300 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]  outline-none cursor-default data-[state=active]:focus:shadow-transparent'
              value='tab2'
            >
              Notícia
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className='grow p-4 bg-white outline-none focus:shadow-[0_0_0_2px] focus:shadow-transparent rounded-lg'
            value='tab1'
          >
            <p className='mb-5 text-mauve11 text-[15px] leading-normal'>
              Preencha o formulário para criar uma nova boleia
            </p>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='name'
              >
                Destino
              </label>
              <input
                ref={boleia.destino}
                type='text'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                id='name'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='username'
              >
                Local de partida
              </label>
              <input
                ref={boleia.dataPartida}
                type='text'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                id='username'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='username'
              >
                Data de partida
              </label>
              <input
                ref={boleia.dataPartida}
                type='datetime-local'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                id='username'
                defaultValue='@peduarte'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='username'
              >
                Lugares disponíveis
              </label>
              <input
                ref={boleia.lugaresDisp}
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                id='username'
                type='number'
                max='99'
                min='1'
              />
            </fieldset>

            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='username'
              >
                Descrição
              </label>
              <textarea
                ref={boleia.descricao}
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                aria-expanded='false'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='username'
              >
                Telefone
              </label>
              <input
                ref={boleia.telefone}
                type='tel'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              />
            </fieldset>
            <div className='flex justify-end mt-5'>
              <button
                onClick={() => {
                  criarBoleia();
                }}
                className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none hover:bg-yellow-300 cursor-pointer'
              >
                Publicar
              </button>
            </div>
          </Tabs.Content>
          <Tabs.Content
            className='grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black'
            value='tab2'
          >
            <p className='mb-5 text-mauve11 text-[15px] leading-normal'>
              Publica uma notícia
            </p>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='name'
              >
                Título
              </label>
              <input
                max={20}
                ref={noticia.titulo}
                type='text'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
                id='name'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='name'
              >
                Conteúdo
              </label>
              <textarea
                ref={noticia.descricao}
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none h-32'
                id='name'
              />
            </fieldset>
            <fieldset className='mb-[15px] w-full flex flex-col justify-start'>
              <label
                className='text-[13px] leading-none mb-2.5 text-gray-800 font-semibold block'
                htmlFor='name'
              >
                Foto <span className='text-xs font-normal'>(opcional)</span>
              </label>
              <Dropzone onDrop={(acceptedFiles) => setImagem(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section className='w-full flex items-center justify-center relative'>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='h-14 w-32 flex items-center justify-center border-1 border-black rounded-md outline-2 outline-dotted cursor-pointer bg-gray-200'>
                        <BsCloudUpload className='animate-bounce' />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </fieldset>
            <div className='flex justify-end mt-5'>
              <button
                className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none hover:bg-yellow-300 cursor-pointer'
                onClick={() => {
                  criarNoticia();
                }}
              >
                Publicar
              </button>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </ModalBox>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <main className='flex-1 relative pt-36 px-10 text-gray-300 space-y-10'>
        <header className='flex lg:!flex-row lg:!items-start flex-col justify-between items-start gap-4 max-w-[60em] m-auto'>
          <h1 className='text-3xl font-bold m-0'>Forum</h1>
          <div className='shadow-lg min-w-[10em] bg-zinc-800 rounded-md h-10 flex items-center p-4 gap-4'>
            <nav>
              <label htmlFor='' className='text-white text-sm'>
                Ordernar por:{' '}
              </label>
              <Select.Root
                onValueChange={(e) => {
                  setOrder(e);
                }}
                value={order}
              >
                <Select.Trigger
                  className='inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-transparent shadow-black/10 data-[placeholder]:text-white focus:outline-none aria-selected:outline-none text-white font-semibold'
                  aria-label='Ordenar por...'
                >
                  <Select.Value placeholder='Ordenar' />
                  <Select.Icon className='text-gray-300'>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className='overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
                    <Select.ScrollUpButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className='p-[5px]'>
                      <Select.Group>
                        <SelectItem value='recente'>Mais recente</SelectItem>
                        <SelectItem value='antigo'>Mais antigo</SelectItem>
                        <SelectItem value='relevante'>
                          Mais relevante
                        </SelectItem>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </nav>
          </div>
        </header>
        <main className='relative w-full flex flex-col gap-4 max-w-[60em] m-auto pb-8'>
          <AnimatePresence>
            {loading &&
              [0, 1, 2, 3, 4].map((i) => {
                return (
                  <Skeleton
                    key={i}
                    visible={loading}
                    className='h-52'
                  ></Skeleton>
                );
              })}
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className='fixed z-20 bottom-20 right-10 rounded-md text-white font-semibold bg-gradient-to-tr from-yellow-200 to-yellow-500 p-3   hover:!from-yellow-300/70 hover:!to-yellow-400/80 transition-all '
              aria-label='Novo post'
            >
              <TfiWrite size={20}></TfiWrite>
            </button>
            {posts.length > 1 || posts !== undefined ? (
              posts
                .filter((el) => {
                  if (menu === Menu.NEWS) {
                    return el?.news !== undefined;
                  } else if (menu === Menu.RIDES) {
                    return el?.ride !== undefined;
                  }
                  return true;
                })
                .map((post) => {
                  if (post?.news) {
                    return (
                      <NewsPost key={post?.news.id} post={post.news}></NewsPost>
                    );
                  }
                  return (
                    <PostComponent
                      key={post?.ride?.id}
                      post={{
                        id: post?.ride?.id,
                        title: 'Boleia',
                        content: 'Boleia',
                      }}
                    ></PostComponent>
                  );
                })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='text-gray-500 flex flex-col justify-center items-center w-full h-full gap-4'
              >
                <h3>À procura de posts...</h3>
                <img
                  src={searching}
                  className='w-full object-cover max-w-[10em]'
                  alt=''
                />
              </motion.div>
            )}
            {posts.length > 0 && (
              <button
                onClick={loadMore}
                className='p-2 w-24 rounded-md text-black font-bold self-center hover:bg-gray-500 hover:text-white transition-all'
              >
                Ver mais
              </button>
            )}
          </AnimatePresence>
        </main>
      </main>
    </div>
  );
}

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className='z-50 text-[13px] leading-none text-gray-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gradient-to-tr data-[highlighted]:from-yellow-300 data-[highlighted]:to-yellow-400 data-[highlighted]:text-gray-600'
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
