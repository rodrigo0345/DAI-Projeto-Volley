import { Calendar } from '@mantine/dates';
import React from 'react';

export default function Scheduler({ type }: { type: string }) {
  return <Calendar className='self-center p-24' />;
}
