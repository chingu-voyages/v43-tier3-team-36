/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import type { TradeOfferTypeType } from '@marvel-collector/types/generated/inputTypeSchemas/TradeOfferTypeSchema';

import { Button, Modal } from '@/components/ui';
import AddTradeForm, { type TFormSchema } from './AddTradeForm';
import useAlertStore from '@/store/store';
import { createTradeOffer } from '@/api';
import type TComicItem from '@/types/comic';
import { createImageUrl } from '@/utils';
import { COMIC_FALLBACK } from '@/data/constants';

type Props = {
  comic: TComicItem;
  onClose: () => void;
};

const NewTradeOffer: React.FC<Props> = ({ comic, onClose }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const newTradeMutation = useMutation({
    mutationFn: createTradeOffer,
    onSuccess: (message) => {
      setAlert({ type: 'success', message });
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
      comicId: comic.id,
      type: (isExchange ? 'EXCHANGE' : 'SELL') as TradeOfferTypeType,
    };
    if (isExchange) {
      // @ts-ignore
      delete transformedNewTradeOffer.price;
    }
    newTradeMutation.mutate(transformedNewTradeOffer);
  };

  return (
    <Modal
      className="w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-3xl"
      title="Create Trade Offer"
      description="Fill in the details to create a listing for this trade"
      open
      onClose={onClose}
    >
      <div className="relative max-w-full mx-auto w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64">
        <Image
          src={createImageUrl(comic.images) || COMIC_FALLBACK}
          alt=""
          fill
          priority
        />
      </div>
      <h2 className="my-2 text-4xl font-medium text-center">{comic.title}</h2>
      <AddTradeForm
        isExchange={isExchange}
        isLoading={newTradeMutation.isLoading}
        onSubmit={submitHandler}
      />
      <Button
        className="mx-auto mb-1 my-7"
        onClick={() => setIsExchange((prevState) => !prevState)}
      >
        {`Switch to ${isExchange ? 'Sell' : 'Exchange'}`}
      </Button>
    </Modal>
  );
};

export default NewTradeOffer;
