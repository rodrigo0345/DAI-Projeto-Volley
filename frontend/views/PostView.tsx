import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      await addClick(id);
    })();
  }, []);

  return <div>PostView - {id}</div>;
}
