import { useEffect, useState } from 'react';
import { Group, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { getAllEvents } from 'Frontend/generated/CalendarController';
import CalendarEvent from 'Frontend/generated/com/example/application/model/CalendarEvent';

export default function CalendarView() {
  const [events, setEvents] = useState<
    (CalendarEvent | undefined)[] | undefined
  >([]);
  const [showEvent, setShowEvent] = useState<CalendarEvent[] | undefined>(
    undefined
  );
  const [selected, setSelected] = useState<Date[]>([]);

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
    <div className='flex justify-between'>
      <Calendar
        className='w-fit'
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
        <div className='flex w-full justify-center p-2'>
          {showEvent ? (
            showEvent?.map((event) => {
              return (
                <div
                  key={event?.id}
                  className='outline outline-offset-2 outline-1 outline-black rounded-md w-64 py-2 px-2 overflow-hidden h-16 text-ellipsis shadow-lg cursor-pointer'
                  onClick={() => {
                    window.location.href = event.linkToPost ?? '#';
                  }}
                >
                  <h1 className='m-0 text-lg text-ellipsis'>{event?.title}</h1>
                  <p className='m-0 text-base font-light'>
                    {event?.description}
                  </p>
                </div>
              );
            })
          ) : (
            <p> Sem detalhes </p>
          )}
        </div>
      </div>
    </div>
  );
}
