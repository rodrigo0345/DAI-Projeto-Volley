import { useState } from 'react';
import { Group } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

function Demo() {
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
        getDayProps={(date: any) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
          onClick: () => handleSelect(date),
        })}
      />
    </Group>
  );
}
