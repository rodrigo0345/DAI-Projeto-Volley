import React from 'react';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  return <div>PostView - {id}</div>;
}
