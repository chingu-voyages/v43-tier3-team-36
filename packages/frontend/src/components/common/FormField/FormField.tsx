/* eslint-disable react/jsx-props-no-spreading */
import type { HTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

type Props = HTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  register: any;
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  options?: any;
  error?: FieldError;
};

const FormField: React.FC<Props> = ({
  id,
  label,
  register,
  type = 'text',
  options = {},
  error,
  ...rest
}) => (
  <div className="flex flex-col my-5">
    <label className="mb-1.5" htmlFor={id}>
      {label}
    </label>
    <input
      className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
      id={id}
      type={type}
      {...register(id, options)}
      {...rest}
    />
    {error ? <span className="mt-2 text-red-500">{error.message}</span> : null}
  </div>
);

export default FormField;
