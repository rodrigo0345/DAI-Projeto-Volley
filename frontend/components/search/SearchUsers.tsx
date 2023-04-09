import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import LoginUser from 'Frontend/generated/com/example/application/model/User/LoginUser';
import { AiOutlineSearch } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';

export default function SearchUsers({
  users,
}: {
  users: (LoginUser | undefined)[];
}) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const filteredUsers =
    query === ''
      ? users
      : users.filter((user) =>
          user?.firstname
            ?.toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className='w-72'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(person: LoginUser) =>
                person?.firstname ?? ' ' + ' ' + person?.lastname ?? ' '
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <AiOutlineSearch size={20}></AiOutlineSearch>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredUsers.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredUsers.map((person) => (
                  <Combobox.Option
                    key={person?.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <span
                        onClick={() => {
                          window.location.href = `/profiles/${person?.id}`;
                        }}
                      >
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person?.firstname + ' ' + person?.lastname}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            icon
                          </span>
                        ) : null}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
