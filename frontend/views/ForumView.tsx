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
import { popularPosts } from 'Frontend/generated/PostController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';

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

  const noticia = {
    titulo: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    imagem: useRef<HTMLInputElement>(null),
  };

  const [imagem, setImagem] = useState<any>(null);
  const boleia = {
    titulo: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLTextAreaElement>(null),
    imagem,
  };

  async function enviarNoticia() {
    const titulo = noticia.titulo.current?.value;
    const descricao = noticia.descricao.current?.value;
    const imagem = noticia.imagem.current?.value;
    if (titulo && descricao) {
      try {
        await PostController.createPost('news', {
          news: {
            title: titulo,
            clicks: 0,
            authorID: user?.id,
            content: descricao,
            createdAt: '',
            id: 0,
          },
        });
      } catch (e) {
        console.log(e);
        return;
      }
      toast.success('Notícia criada com sucesso');
    } else {
      toast.error('Preencha todos os campos');
    }
  }

  useEffect(() => {
    // filtrar os posts pelo menu selecionado
  }, [menu]);

  function checkTypeOfPost(post: PostType): string | undefined {
    if (post.news) {
      return 'news';
    } else if (post.ride) {
      return 'ride';
    }
    return undefined;
  }

  useEffect(() => {
    // cria uma conexão com o backend para receber os posts
    (async () => {
      const posts = await popularPosts(8, 0);
      if (!posts) return;
      setPosts(posts);
    })();
  }, []);

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
          className='p-4 m-auto relative !max-w-[45em] lg:max-w-[50em] md:!w-[25em] w-full overflow-x-hidden shadow-lg rounded-lg z-[100]'
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
            className='grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-transparent'
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
                Data de partida
              </label>
              <input
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
                type='tel'
                className='grow shrink-0 rounded px-2.5 text-[15px] leading-none text-gray-800 shadow-[0_0_0_1px] shadow-transparent h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-transparent outline-none'
              />
            </fieldset>
            <div className='flex justify-end mt-5'>
              <button className='inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none hover:bg-yellow-300 cursor-pointer'>
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
                  enviarNoticia();
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
              <Select.Root>
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
                        <SelectItem value='mais recente'>
                          Mais recente
                        </SelectItem>
                        <SelectItem value='banana'>Mais antigo</SelectItem>
                        <SelectItem value='blueberry'>
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
        <main className='relative w-full gap-4 max-w-[60em] m-auto'>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className='fixed z-20 bottom-20 right-10 rounded-md text-white font-semibold bg-gradient-to-tr from-yellow-200 to-yellow-500 p-3  shadow-lg hover:!from-yellow-300/70 hover:!to-yellow-400/80 transition-all'
            aria-label='Novo post'
          >
            <TfiWrite size={20}></TfiWrite>
          </button>
          {posts.map((post) => {
            if (post?.news) {
              return (
                <PostComponent
                  key={post?.news.id}
                  post={{
                    id: post.news.id,
                    title: post.news.title,
                    content: post.news.content,
                  }}
                ></PostComponent>
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
          })}
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
