import { useMemo, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';

export interface AutoCompleteProps<T> {
  /**
   * Data to supply the component with
   */
  data: T[];
  /**
   * Keys to render the list item elements
   */
  optionKeys: {
    key: keyof T;
    value: keyof T;
    label: keyof T;
  };
  /**
   * Event callback when active selection is changed
   */
  onSelect: (value: T) => void;
}

export const AutoComplete = <T extends object>({
  data,
  optionKeys,
  onSelect,
}: AutoCompleteProps<T>) => {
  const [selectedOption, setSelectedOption] = useState(data[0]);
  const [query, setQuery] = useState('');

  const filteredData = useMemo(
    () => (query === ''
      ? data
      : data.filter((item) =>
        // @ts-ignore
        // eslint-disable-next-line implicit-arrow-linebreak
        item[optionKeys.value].toLowerCase().includes(query.toLowerCase()))),
    [query, data, optionKeys.value],
  );

  return (
    <Combobox
      as="div"
      className="relative w-full bg-white"
      value={selectedOption}
      onChange={(value) => {
        setSelectedOption(value);
        onSelect(value);
      }}
    >
      <Combobox.Input
        className="w-full p-4 border rounded-md"
        onChange={(event) => setQuery(event.target.value)}
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
              value={item[optionKeys.value]}
            >
              {({ active }) => (
                <li
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  }`}
                >
                  {/* @ts-ignore */}
                  {item[optionKeys.label]}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};
