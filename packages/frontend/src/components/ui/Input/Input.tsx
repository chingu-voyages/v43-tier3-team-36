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
    className={`flex gap-3 border-none text-gray-900 text-sm rounded-lg bg-gray-100  ${
      fullWidth ? ' w-full ' : 'w-60'
    } p-2  `}
  >
    {Icon && <span>{Icon}</span>}
    <input
      className="w-full outline-none bg-gray-100 "
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      id="comic_search"
      placeholder={placeholder}
      required
    />
  </div>
);
