import { useState } from 'react';
import { Group, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

export default function CalendarView() {
  const [selected, setSelected] = useState<Date[]>([]);
  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, 'date'))
      );
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <Group position='center'>
      <Calendar
        sx={{
          '&': {
            width: '100px',
          },
        }}
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={6} color='red' offset={-2} disabled={day !== 16}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
    </Group>
  );
}
