import { getPost } from 'Frontend/generated/PostController';
import PostType from 'Frontend/generated/com/example/application/controller/Forum/Wrappers/PostType';
import News from 'Frontend/generated/com/example/application/model/News/News';
import Ride from 'Frontend/generated/com/example/application/model/Ride';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [news, setNews] = useState<News | undefined>(undefined);
  const [rides, setRides] = useState<Ride | undefined>(undefined); // [1

  useEffect(() => {
    (async () => {
      const post = await getPost(type, Number.parseInt(id ?? '0'));
      if (type === 'news') setNews(post?.news);
      else if (type === 'ride') setRides(post?.ride); // [2]
    })();
  }, []);

  return (
    <div className='h-screen z-10 bg-white relative'>
      <article className='pt-20'>
        <h1>{news?.title ?? rides?.destination}</h1>
        <h3>{news ? 'News' : 'Ride'}</h3>
        <p>{news?.content ?? rides?.description}</p>
      </article>
    </div>
  );
}
