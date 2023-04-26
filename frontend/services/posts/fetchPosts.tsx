import {
  popularPosts,
  postsByNewest,
  postsByOlder,
} from 'Frontend/generated/PostController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import { toast } from 'react-toastify';

export enum Order {
  POPULAR = 'popular',
  OLDEST = 'oldest',
  NEWEST = 'newest',
}

export async function fetchPopularPosts(
  index: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPosts: React.Dispatch<React.SetStateAction<(PostType | undefined)[]>>,
  prevPosts?: (PostType | undefined)[]
) {
  const posts = await popularPosts(8, index);
  if (!posts || posts.length === 0) {
    toast.warn('Não existem mais posts');
    setLoading(false);
    return;
  }
  return posts;
}

export async function fetchPostsByMostRecent(
  index: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPosts: React.Dispatch<React.SetStateAction<(PostType | undefined)[]>>,
  prevPosts?: (PostType | undefined)[]
) {
  const posts = await postsByNewest(8, index);
  if (!posts) {
    toast.warn('Não existem mais posts');
    setLoading(false);
    return;
  }
  return posts;
}

export async function fetchPostsByOldest(
  index: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPosts: React.Dispatch<React.SetStateAction<(PostType | undefined)[]>>,
  prevPosts?: (PostType | undefined)[]
) {
  const posts = await postsByOlder(8, index);
  if (!posts) {
    toast.warn('Não existem mais posts');
    setLoading(false);
    return;
  }
  return posts;
}

export async function loadMore(
  currIndex: number,
  setCurrIndex: React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPosts: React.Dispatch<React.SetStateAction<(PostType | undefined)[]>>,
  posts: (PostType | undefined)[],
  order: Order
) {
  const newIndex = currIndex + 1;
  setCurrIndex(newIndex);

  if ((Order.POPULAR.toUpperCase() as string) === order) {
    const nextPosts = await fetchPopularPosts(
      newIndex,
      setLoading,
      setPosts,
      posts
    );
    setPosts([...(posts ?? []), ...(nextPosts ?? [])]);
  } else if ((Order.NEWEST.toUpperCase() as string) === order) {
    const nextPosts = await fetchPostsByMostRecent(
      newIndex,
      setLoading,
      setPosts,
      posts
    );
    setPosts([...(posts ?? []), ...(nextPosts ?? [])]);
  } else if ((Order.OLDEST.toUpperCase() as string) === order) {
    const nextPosts = await fetchPostsByOldest(
      newIndex,
      setLoading,
      setPosts,
      posts
    );
    setPosts([...(posts ?? []), ...(nextPosts ?? [])]);
  }
}
