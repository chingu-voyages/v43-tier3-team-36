import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Button } from '../Button';

export interface MenuProps {
  children: React.ReactNode;
  buttonContent?: string | JSX.Element;
}

export interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const DropdownMenu = ({ children, buttonContent }: MenuProps) => (
  <Menu as="article">
    <Menu.Button className="p-1.5 bg-gray-50 border rounded-lg">
      {buttonContent}
    </Menu.Button>
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items className="mt-1 py-4 px-3 w-fit flex flex-col text-darkgrey border rounded-xl bg-white opacity-90">
        {/* map desired menu items here as <Menu.Item as={MenuItem}>{..}</Menu.Item> */}
        {children}
      </Menu.Items>
    </Transition>
  </Menu>
);

export const MenuItem = ({ children, onClick }: MenuItemProps) => (
  <Button
    className="py-2 px-2 text-gray-900 rounded-lg bg-white hover:bg-gray-100"
    onClick={() => {
      onClick();
    }}
  >
    {children}
  </Button>
);
