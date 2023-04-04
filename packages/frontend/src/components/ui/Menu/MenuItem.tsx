import React from 'react';
import { Button } from '../Button';

export interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

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
