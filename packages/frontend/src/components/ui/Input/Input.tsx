import React, { ReactNode } from 'react';

export type TInputFieldProps = {
  placeholder?: string;
  Icon?: ReactNode;
  fullWidth?: boolean;
  value: string;
  onChange: (inputValue: string) => void;
};

export const InputField = ({
  placeholder,
  Icon,
  fullWidth,
  value,
  onChange,
}: TInputFieldProps) => (
  <div
    className={`flex gap-3 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  ${
      fullWidth ? ' w-full ' : 'w-60'
    } p-2 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
  >
    {Icon && <span>{Icon}</span>}
    <input
      className="w-full outline-none bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      id="comic_search"
      placeholder={placeholder}
      required
    />
  </div>
);
