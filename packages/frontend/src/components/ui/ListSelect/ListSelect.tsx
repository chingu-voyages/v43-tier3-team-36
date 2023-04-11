import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';

export type ListData = {
  [currValue: string]: string;
}[];

export type ListSelectProps = {
  data: ListData;
  /**
   *currValue - value in the <Listbox.Button /> which will show the default or curr selected value
   */
  currValue: string;
  /**
   *btnStyles, allows you to style the <Listbox.Button />
   */
  btnStyles: string;
  children: React.ReactNode;
};

export const ListSelect = ({
  data,
  currValue,
  btnStyles,
  children,
}: ListSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(data[0]);
  return (
    <Listbox
      as="article"
      className="w-full relative bg-white"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <Listbox.Button
        className={twMerge(clsx('w-full p-4 border rounded-md', btnStyles))}
      >
        {selectedOption[currValue]}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      />
      <Listbox.Options className="absolute z-10 w-full py-3 bg-white shadow-[-0px_0px_4px_1px] shadow-gray-200 rounded-lg">
        {/* dynamically map list data hrtr */}
        {children}
      </Listbox.Options>
    </Listbox>
  );
};
