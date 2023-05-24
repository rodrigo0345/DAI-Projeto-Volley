import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { Order } from 'Frontend/services/posts/fetchPosts';
import React from 'react';

export default function FilterContent({
  order,
  setOrder,
}: {
  order: { [s: number]: string };
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}) {
  return (
    <div className='shadow-lg min-w-[10em] bg-zinc-100  rounded-md h-10 flex items-center p-4 gap-4'>
      <nav>
        <label htmlFor='' className='text-gray-800 text-sm'>
          Ordernar por:{' '}
        </label>
        <Select.Root
          onValueChange={(e) => {
            setOrder(e as Order);
          }}
          defaultValue={Object.keys(order)[0]}
        >
          <Select.Trigger
            className='inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-transparent shadow-black/10 data-[placeholder]:text-white focus:outline-none aria-selected:outline-none text-gray-800 font-semibold'
            aria-label='Ordenar por...'
          >
            <Select.Value placeholder='Ordenar' />
            <Select.Icon className='text-gray-800'>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal className='z-50'>
            <Select.Content className='overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
              <Select.ScrollUpButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className='p-[5px]'>
                <Select.Group>
                  {
                    // read all the keys of the enum
                    Object.keys(order).map((key) => {
                      return (
                        <SelectItem
                          key={key}
                          value={key}
                          className='text-[13px] leading-none text-gray-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gradient-to-tr data-[highlighted]:from-yellow-300 data-[highlighted]:to-yellow-400 data-[highlighted]:text-gray-600'
                        >
                          {order[key as any]}
                        </SelectItem>
                      );
                    })
                  }
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default'>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </nav>
    </div>
  );
}

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className='z-50 text-[13px] leading-none text-gray-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gradient-to-tr data-[highlighted]:from-yellow-300 data-[highlighted]:to-yellow-400 data-[highlighted]:text-gray-600'
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
