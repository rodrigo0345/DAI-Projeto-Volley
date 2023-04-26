import SidePanel, {
  AsideContent,
} from 'Frontend/components/sidePanel/SidePanel';
import { UserContext } from 'Frontend/contexts/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsCalendarDate, BsCarFront, BsCloudUpload } from 'react-icons/bs';
import { MdOutlineForum } from 'react-icons/md';
import { ImNewspaper } from 'react-icons/im';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { TfiWrite } from 'react-icons/tfi';
import { Subscription } from '@hilla/frontend';
import { PostController } from 'Frontend/generated/endpoints';

import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';

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
import {
  Order,
  fetchPopularPosts,
  fetchPostsByMostRecent,
  fetchPostsByOldest,
  loadMore,
} from 'Frontend/services/posts/fetchPosts';
import { criarNoticia } from 'Frontend/services/posts/createPost';
import FilterContent from 'Frontend/components/filterContent/FilterContent';
import { RidePost } from 'Frontend/components/posts/RidePost';
import CreatePost from 'Frontend/components/posts/CreatePost';
import { CgProfile } from 'react-icons/cg';

enum Menu {
  ALL = 'ALL',
  NEWS = 'NEWS',
  RIDES = 'RIDES',
  MINE = 'MINE',
}

export default function ForumView() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState<Menu>(Menu.ALL);
  const [posts, setPosts] = useState<(PostType | undefined)[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>(Order.POPULAR);
  const [currIndex, setCurrIndex] = useState(0);
  const [imagem, setImagem] = useState<any>(null);

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
    {
      id: 3,
      text: 'Minhas publicações',
      icon: (
        <CgProfile
          color={menu === Menu.MINE ? 'white' : 'black'}
          size={20}
        ></CgProfile>
      ),
      activator: {
        setter: setMenu,
        state: menu,
      },
      targetState: Menu.MINE,
      link: '/calendar',
    },
    // adicionar novos menus é aqui
  ];

  useEffect(() => {
    setOrder(Order.POPULAR);
    setCurrIndex(0);
    (async () => {
      const posts = await fetchPopularPosts(0, setLoading, setPosts);
      const filteredPosts = posts?.filter((post) => {
        if (menu === Menu.ALL) return true;
        if (menu === Menu.NEWS && post?.news) return true;
        if (menu === Menu.RIDES && post?.ride) return true;
        if (
          menu === Menu.MINE &&
          (post?.news?.authorID === user?.id ||
            post?.ride?.driverID === user?.id)
        )
          return true;
        return false;
      });
      setPosts(filteredPosts ?? []);
    })();
  }, [menu]);

  useEffect(() => {
    setCurrIndex(0);
    (async () => {
      setLoading(true);
      if ((Order.POPULAR as string).toUpperCase() === order) {
        const posts = await fetchPopularPosts(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (menu === Menu.ALL) return true;
          if (menu === Menu.NEWS && post?.news) return true;
          if (menu === Menu.RIDES && post?.ride) return true;
          if (
            menu === Menu.MINE &&
            (post?.news?.authorID === user?.id ||
              post?.ride?.driverID === user?.id)
          )
            return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      } else if ((Order.NEWEST as string).toUpperCase() === order) {
        const posts = await fetchPostsByMostRecent(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (menu === Menu.ALL) return true;
          if (menu === Menu.NEWS && post?.news) return true;
          if (menu === Menu.RIDES && post?.ride) return true;
          if (
            menu === Menu.MINE &&
            (post?.news?.authorID === user?.id ||
              post?.ride?.driverID === user?.id)
          )
            return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      } else if ((Order.OLDEST as string).toUpperCase() === order) {
        const posts = await fetchPostsByOldest(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (menu === Menu.ALL) return true;
          if (menu === Menu.NEWS && post?.news) return true;
          if (menu === Menu.RIDES && post?.ride) return true;
          if (
            menu === Menu.MINE &&
            (post?.news?.authorID === user?.id ||
              post?.ride?.driverID === user?.id)
          )
            return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      }
      setLoading(false);
    })();
  }, [order]);

  useEffect(() => {
    // cria uma conexão com o backend para receber os posts
    if (posts.length > 0) return;

    (async () => {
      setLoading(true);
      if (menu === Menu.ALL) {
        const posts = await fetchPopularPosts(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (menu === Menu.ALL) return true;
          if (menu === Menu.NEWS && post?.news) return true;
          if (menu === Menu.RIDES && post?.ride) return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      } else if (menu === Menu.NEWS) {
        const posts = await fetchPopularPosts(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (post?.news) return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      } else {
        const posts = await fetchPopularPosts(0, setLoading, setPosts);
        const filteredPosts = posts?.filter((post) => {
          if (post?.ride) return true;
          return false;
        });
        setPosts(filteredPosts ?? []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className='min-h-screen flex relative z-10 bg-white shadow-lg'>
      <CreatePost
        openModal={openModal}
        setOpenModal={setOpenModal}
        boleia={boleia}
        noticia={noticia}
        user={
          user ?? {
            id: 1,
            email: 'rodrigo@gmail.com',
            lastname: 'Santos',
            role: 'admin',
            stringToken: 'stringToken',
            firstname: 'Rodrigo',
          }
        }
      ></CreatePost>
      <SidePanel user={user} logout={logout} content={content}></SidePanel>
      <main className='flex-1 relative pt-36 px-10 text-gray-300 space-y-10'>
        <header className='flex lg:!flex-row lg:!items-start flex-col justify-between items-start gap-4 max-w-[60em] m-auto'>
          <h1 className='text-3xl font-bold m-0'>Forum</h1>
          <FilterContent setOrder={setOrder} order={Order}></FilterContent>
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
            {posts.length > 0 ? (
              posts.map((post) => {
                if (post?.news) {
                  return (
                    <NewsPost
                      key={post?.news.id}
                      post={post.news}
                      user={user}
                    ></NewsPost>
                  );
                }
                return (
                  <RidePost
                    key={post?.ride?.id}
                    post={post?.ride}
                    user={user}
                  ></RidePost>
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
            {posts.length > 6 && (
              <button
                onClick={() =>
                  loadMore(
                    currIndex,
                    setCurrIndex,
                    setLoading,
                    setPosts,
                    posts,
                    order
                  )
                }
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
