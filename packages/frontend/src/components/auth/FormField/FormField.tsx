import { FieldValues } from 'react-hook-form';

/* eslint-disable react/jsx-props-no-spreading */
type RegisterOptions = {
  required?: boolean | string;
  minLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
};

export type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  register: (name: string, RegisterOptions: object) => object;
  options: RegisterOptions;
  error: FieldValues;
};

export const FormField = ({
  id,
  label,
  type,
  placeholder,
  register,
  options,
  error,
}: FormFieldProps) => (
  <div className="my-5 flex flex-col">
    <label className="mb-1.5" htmlFor={id}>
      {label}
    </label>
    <input
      className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
      id={id}
      type={type || 'text'}
      placeholder={placeholder}
      {...register(`${id}`, options)}
    />
    {error[id] && (
      <span className="mt-2 text-red-500">{error[id].message}</span>
    )}
  </div>
);
