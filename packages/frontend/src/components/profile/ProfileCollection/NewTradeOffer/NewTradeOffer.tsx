/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import type { CollectionItemPartial } from '@marvel-collector/types';
import type { TradeOfferTypeType } from '@marvel-collector/types/generated/inputTypeSchemas/TradeOfferTypeSchema';

import { Button, Modal } from '@/components/ui';
import AddTradeForm, { type TFormSchema } from './AddTradeForm';
import useAlertStore from '@/store/store';
import { createTradeOffer } from '@/api';
import { DELAY_CLOSE_MS, COMIC_FALLBACK } from '@/data/constants';

type Props = {
  comic: CollectionItemPartial;
  onClose: () => void;
};

const NewTradeOffer: React.FC<Props> = ({ comic, onClose }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const newTradeMutation = useMutation({
    mutationFn: createTradeOffer,
    onSuccess: (message) => {
      setAlert({ type: 'success', message });
      setTimeout(() => onClose(), DELAY_CLOSE_MS);
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err as string,
      });
    },
  });
  const [isExchange, setIsExchange] = useState(false);

  const submitHandler = (newTradeOffer: TFormSchema) => {
    const transformedNewTradeOffer = {
      ...newTradeOffer,
      comicId: comic.comicId,
      type: (isExchange ? 'EXCHANGE' : 'SELL') as TradeOfferTypeType,
      price: Number(newTradeOffer.price),
    };
    if (isExchange) {
      // @ts-ignore
      delete transformedNewTradeOffer.price;
    }
    newTradeMutation.mutate(transformedNewTradeOffer);
  };

  return (
    <Modal
      className={clsx('w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-3xl', {
        'opacity-80': newTradeMutation.isPaused,
      })}
      title="Create Trade Offer"
      description="Fill in the details to create a listing for this comic"
      open
      onUnmount={onClose}
    >
      <div className="relative max-w-full mx-auto w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64">
        <Image src={comic.imageUrl || COMIC_FALLBACK} alt="" fill priority />
      </div>
      <h2 className="mt-5 text-md md:text-lg lg:text-2xl font-medium text-center w-[95%] max-w-[35ch] mx-auto">
        {comic.title}
      </h2>
      <Button
        className="mx-auto mb-1 my-7"
        onClick={() => setIsExchange((prevState) => !prevState)}
      >
        {`Switch to ${isExchange ? 'Sell' : 'Exchange'}`}
      </Button>
      <AddTradeForm
        isExchange={isExchange}
        isLoading={newTradeMutation.isLoading || newTradeMutation.isPaused}
        onSubmit={submitHandler}
      />
    </Modal>
  );
};

export default NewTradeOffer;
