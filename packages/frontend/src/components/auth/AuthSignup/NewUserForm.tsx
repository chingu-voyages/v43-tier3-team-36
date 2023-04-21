/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { AutoComplete, Button } from '@/components/ui';
import FormField from '@/components/common/FormField';
import countryData from '@/data/countryData';

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TFormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: TFormSchema) => void;
};

const NewUserForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-2">
        <FormField
          id="firstName"
          label="First name"
          placeholder="Enter your firstname"
          register={register}
          error={errors.firstName}
        />
        <FormField
          id="lastName"
          label="Last name"
          placeholder="Enter your lastname"
          register={register}
          error={errors.lastName}
        />
      </div>
      <FormField
        id="username"
        label="Username"
        placeholder="Enter a username"
        register={register}
        error={errors.username}
      />
      <div className="grid grid-cols-[3fr_1fr] gap-x-4">
        <div className="flex flex-col my-5">
          <label className="mb-1.5" htmlFor="country">
            Country
          </label>
          <AutoComplete<(typeof countryData)[0]>
            className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
            id="country"
            placeholder="Enter in your country"
            data={countryData}
            optionKeys={{
              key: 'code',
              value: 'name',
              label: 'name',
            }}
            onSelect={(newVal) => setValue('country', newVal)}
          />
          {errors.country ? (
            <span className="mt-2 text-red-500">{errors.country.message}</span>
          ) : null}
        </div>
        <FormField
          id="city"
          label="City"
          placeholder="Enter your city"
          register={register}
          error={errors.city}
        />
      </div>
      <FormField
        id="email"
        label="Email address"
        type="email"
        placeholder="name@mail.com"
        register={register}
        error={errors.email}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password}
      />

      <Button
        className="w-full py-4 my-8 text-base font-normal"
        type="submit"
        disabled={isSubmitting}
      >
        Create my account
      </Button>
    </form>
  );
};

export default NewUserForm;
