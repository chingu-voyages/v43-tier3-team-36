/* eslint-disable react/jsx-props-no-spreading */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Combobox, ComboboxInputProps, Transition } from '@headlessui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';

import { DEBOUNCE_DELAY } from '@/data/constants';
import { useDebounce } from '@/hooks';

export interface AutoCompleteProps<T> {
  /**
   * Data to supply the component with
   */
  data: T[];
  /**
   * Keys to identify the props of T to access by
   * and to render into list item elements
   */
  optionKeys: {
    key: keyof T;
    value?: keyof T;
    label: keyof T;
  };
  /**
   * CSS Classes
   */
  className: string;
  /**
   * Event callback when active selection is changed
   */
  onSelect: (value: any, query?: string) => void;
}

export const AutoComplete = <T extends object>({
  data,
  optionKeys,
  onSelect,
  className,
  ...rest
}: AutoCompleteProps<T> & ComboboxInputProps<'input', any>) => {
  const [selectedOption, setSelectedOption] = useState(data[0] || null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const filteredData = useMemo(
    () => (query === ''
      ? data
      : data.filter((item) => {
        if (optionKeys.value) {
          return (
            item[optionKeys.value]
              // @ts-ignore
              .toLowerCase()
              .includes(query.toLowerCase())
          );
        }
        return (
          item[optionKeys.label]
            // @ts-ignore
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      })),
    [query, data, optionKeys.value, optionKeys.label],
  );

  const changedValueHandler = useCallback(
    (value: T) => {
      if (typeof value === 'object') {
        // @ts-ignore
        setSelectedOption(value[optionKeys.label]);
      } else {
        setSelectedOption(value);
      }
    },
    [optionKeys.label],
  );

  useEffect(() => {
    onSelect(selectedOption, debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, debouncedQuery]);

  return (
    <Combobox
      as="div"
      className="relative w-full bg-white"
      value={selectedOption}
      onChange={changedValueHandler}
    >
      <Combobox.Input
        className={twMerge('w-full p-4 border rounded-md', className)}
        onChange={(event) => setQuery(event.target.value)}
        {...rest}
      />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options className="absolute z-10 w-full py-3 bg-white shadow-[-0px_0px_4px_1px] shadow-gray-200 rounded-lg">
          {filteredData.map((item) => (
            <Combobox.Option
              // @ts-ignore
              key={item[optionKeys.key]}
              value={optionKeys.value ? item[optionKeys.value] : item}
            >
              {({ active }) => (
                <p
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  }`}
                >
                  {/* @ts-ignore */}
                  {item[optionKeys.label]}
                </p>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};
