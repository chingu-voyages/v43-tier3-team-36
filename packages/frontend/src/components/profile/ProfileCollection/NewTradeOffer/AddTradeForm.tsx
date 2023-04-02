/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui';
import FormField from '@/components/common/FormField/FormField';
import { TELEPHONE_REGEX } from '@/data/constants';

const formSchema = z
  .object({
    price: z.coerce.number().gte(1),
    message: z.string().min(32),
    email: z
      .string()
      .email()
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val)),
    phoneNumber: z
      .string()
      .regex(TELEPHONE_REGEX, 'Invalid telephone')
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val)),
  })
  .refine((data) => data.phoneNumber || data.email, {
    path: ['email'],
    message: 'Either at least an email or telephone should be filled in.',
  });

export type TFormSchema = z.infer<typeof formSchema>;

type Props = {
  isExchange: boolean;
  isLoading: boolean;
  onSubmit: (data: TFormSchema) => void;
};

const AddTradeForm: React.FC<Props> = ({ isExchange, isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const submitHandler = (data: TFormSchema) => {
    if (isValid) {
      return onSubmit(data);
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col my-5">
        <label className="mb-1.5" htmlFor="message">
          Message
        </label>
        <textarea
          className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
          id="message"
          placeholder="Write a message to describe your comic book offering"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('message')}
        />
        {errors.message ? (
          <span className="mt-2 text-red-500">{errors.message.message}</span>
        ) : null}
      </div>
      <FormField
        id="email"
        label="Email Contact"
        type="email"
        placeholder="name@email.com"
        register={register}
        error={errors.email}
      />
      <FormField
        id="phoneNumber"
        label="Telephone Contact"
        type="tel"
        placeholder="123-456-789"
        register={register}
        error={errors.phoneNumber}
      />
      {!isExchange && (
        <FormField
          id="price"
          label="Your Price"
          type="number"
          placeholder="Price in dollars ($)"
          register={register}
          error={errors.price}
        />
      )}
      <Button
        className="w-64 max-w-full py-4 mx-auto my-8 text-base font-normal"
        type="submit"
        disabled={isLoading}
      >
        Create Offer
      </Button>
    </form>
  );
};

export default AddTradeForm;
