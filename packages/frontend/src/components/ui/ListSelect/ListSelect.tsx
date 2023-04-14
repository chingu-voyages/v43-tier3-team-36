import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';

export type ListObject = {
  [key: string]: string | number;
};

export type ListSelectProps = {
  data: ListObject[];
  /**
   * Value in list data to label the
   */
  labelKey: string;
  /**
   * Allows you to style the <Listbox.Button />
   */
  btnStyles: string;
  children: React.ReactNode;
};

export const ListSelect = ({
  data,
  labelKey,
  btnStyles,
  children,
}: ListSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(data[0]);

  return (
    <Listbox
      as="article"
      className="relative w-full bg-white"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <Listbox.Button
        className={twMerge(clsx('w-full p-4 border rounded-md', btnStyles))}
      >
        {selectedOption[labelKey]}
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

export const ListSelectOption = Listbox.Option;
