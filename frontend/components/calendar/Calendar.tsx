import { useEffect, useState } from 'react';
import { Group, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { getAllEvents } from 'Frontend/generated/CalendarController';
import CalendarEvent from 'Frontend/generated/com/example/application/model/CalendarEvent';
import { format } from 'date-fns';

export default function CalendarView() {
  const [events, setEvents] = useState<
    (CalendarEvent | undefined)[] | undefined
  >([]);
  const [showEvent, setShowEvent] = useState<CalendarEvent[] | undefined>(
    undefined
  );
  const [selected, setSelected] = useState<Date[]>([]);
  const randomImages = [
    'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
    'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
    'https://images.unsplash.com/photo-1587614380862-0294308ae58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  ];

  const handleSelect = (date: Date) => {
    setSelected([date]);
  };

  useEffect(() => {
    if (selected.length === 1) {
      const selectedDate = selected[0];
      const selectedEvents = events?.filter((event) => {
        if (
          dayjs(selectedDate).isSame(new Date(event?.startDate ?? ''), 'date')
        ) {
          return true;
        }
        return false;
      });
      setShowEvent(selectedEvents as CalendarEvent[]);
    } else {
      setShowEvent(undefined);
    }
  }, [selected]);

  useEffect(() => {
    (async () => {
      const events = await getAllEvents();
      setEvents(events);
    })();
  }, []);

  return (
    <div className='flex flex-col justify-between flex-wrap gap-8 pb-8'>
      <Calendar
        className='w-fit self-center justify-self-center p-2'
        sx={{
          '&': {
            width: '100px',
          },
        }}
        renderDay={(date) => {
          const day = date.getDate();
          console.log({ events });
          const isInEvents = events?.find((event) => {
            if (dayjs(date).isSame(new Date(event?.startDate ?? ''), 'date')) {
              return true;
            }
            return false;
          });
          if (isInEvents) {
            return (
              <Indicator size={6} color='red'>
                <div>{day}</div>
              </Indicator>
            );
          }
          return <div>{day}</div>;
        }}
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
          onClick: () => handleSelect(date),
        })}
      />
      <div className='flex-1 px-2 relative'>
        <h1 className='m-0 text-lg text-center'>Detalhes</h1>
        <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow'>
          <ul className='divide-y divide-gray-100 py-2 px-4 cursor-pointer'>
            {showEvent?.map((event) => (
              <li
                className='flex py-4'
                onClick={() => {
                  window.location.href = event.linkToPost ?? '#';
                }}
              >
                <div className='mr-4 flex-1'>
                  <h4 className='text-lg font-medium text-gray-900'>
                    {event?.title}
                  </h4>
                  <div className='mt-1 text-sm text-gray-400'>
                    <span>{event?.description}</span> •{' '}
                    <time>
                      {format(new Date(event?.startDate ?? ''), 'dd/mm/yyyy') ??
                        ''}
                    </time>
                  </div>
                </div>
                <div>
                  <img
                    src={
                      randomImages[
                        Math.floor(Math.random() * randomImages.length)
                      ]
                    }
                    className='h-20 w-20 rounded-lg object-cover'
                    alt=''
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
