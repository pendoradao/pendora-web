import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { Menu as HMenu, Transition } from '@headlessui/react';

import { Button } from './button';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

interface MenuProps {
  children: ReactNode;
  items: MenuItemProps[][];
  classNameMenu?: string;
}

export const Menu : FC<MenuProps> = (
  { children, items, classNameMenu }: MenuProps,
) => {
  return (
    <HMenu as='div' className={`relative ${classNameMenu}`}>
      <HMenu.Button>
        {children}
      </HMenu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((itemGroup, i) => (
            <div key={i} className="px-1 py-1 ">
              {itemGroup.map((item, j) => (
                <HMenu.Item key={j}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={clsx(
                        active ? 'bg-slate-100 ' : 'text-gray-900',
                        'group flex w-full items-center px-2 py-2 text-sm',
                      )}
                    >
                      {item.label}
                    </button>
                  )}
                </HMenu.Item>
              ))}
            </div>
          ))}
        </HMenu.Items>
      </Transition>
    </HMenu>
  )
};