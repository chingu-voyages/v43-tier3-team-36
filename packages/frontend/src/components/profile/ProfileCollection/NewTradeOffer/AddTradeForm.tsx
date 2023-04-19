/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { AutoComplete, Button } from '@/components/ui';
import FormField from '@/components/common/FormField/FormField';
import { searchComics } from '@/api';
import { TELEPHONE_REGEX } from '@/data/constants';

const formSchema = z
  .object({
    price: z.coerce.number().gte(1).or(z.literal('')),
    wantedComicId: z.number(),
    message: z.string().min(32),
    email: z.string().email().or(z.literal('')),
    phoneNumber: z
      .string()
      .regex(TELEPHONE_REGEX, 'Invalid telephone')
      .or(z.literal('')),
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
    setValue,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { data: comicsData } = useQuery(['search-marvel-comics', searchTerm], {
    queryFn: () => searchComics(searchTerm),
    initialData: [],
    enabled: isExchange && !!searchTerm,
  });

  // eslint-disable-next-line arrow-body-style
  const submitHandler = (data: TFormSchema) => {
    const transformedData = { ...data };

    // NOTE: Backend DOES NOT ACCEPT these values
    // so therefore must be removed before data submission
    if (transformedData.email === '') {
      // @ts-ignore
      delete transformedData.email;
    }
    if (transformedData.phoneNumber === '') {
      // @ts-ignore
      delete transformedData.email;
    }

    return onSubmit(data);
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
      {isExchange && (
        <div className="flex flex-col my-5">
          <label className="mb-1.5" htmlFor="wanted-comic">
            Wanted Comic
          </label>
          <AutoComplete
            className="p-3.5 bg-slate-50 border-[1px] rounded-lg"
            id="wanted-comic"
            placeholder="Enter in your wanted comic"
            data={comicsData}
            optionKeys={{
              key: 'id',
              value: undefined,
              label: 'title',
            }}
            // @ts-ignore
            onSelect={(newComic, query) => {
              if (newComic) {
                setValue('wantedComicId', newComic.id);
              }
              if (!newComic || query !== newComic.title) {
                setSearchTerm(query as string);
              }
            }}
          />
          {errors.wantedComicId ? (
            <span className="mt-2 text-red-500">
              {errors.wantedComicId.message}
            </span>
          ) : null}
        </div>
      )}
      <Button
        className={clsx(
          'w-64 max-w-full py-4 mx-auto my-8 text-base font-normal',
          { 'opacity-[.38]': isLoading },
        )}
        type="submit"
        disabled={isLoading}
      >
        Create Offer
      </Button>
    </form>
  );
};

export default AddTradeForm;
