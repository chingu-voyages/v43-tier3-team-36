import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  OfferItem,
  type IOfferItem,
} from '@/components/common/OfferItem/OfferItem';
import TradeOfferDialog from './TradeOfferDialog';
import useAlertStore from '@/store/store';
import { requestTradeOffer } from '@/api';
import { DELAY_CLOSE_MS } from '@/data/constants';

const HEADINGS = [
  '#',
  'comic book',
  'price',
  'comic issue',
  'created time',
  'collector',
  'trade type',
];

const OfferListHeadings = () => (
  <div className="hidden md:grid md:grid-cols-[minmax(0,_50px)_4fr_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)] md:justify-items-center px-4 md:px-6 ">
    {HEADINGS.map((heading, index) => (
      <span
        key={`heading-${index + 1}`}
        className="text-xs text-gray-600 uppercase"
      >
        {heading}
      </span>
    ))}
  </div>
);

type Props = {
  offers: any[];
  onProfile?: boolean;
};

const Offers: React.FC<Props> = ({ offers, onProfile }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const [activeOffer, setActiveOffer] = useState<any>(null);
  const requestTradeMutation = useMutation({
    mutationFn: requestTradeOffer,
    onSuccess: (message) => {
      setAlert({ type: 'success', message });
      setTimeout(() => setActiveOffer(null), DELAY_CLOSE_MS);
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err as string,
      });
    },
  });

  const viewTradeHandler = (offer: IOfferItem) => {
    setActiveOffer(offer);
  };

  return (
    <section className="my-8">
      {activeOffer ? (
        <TradeOfferDialog
          type={activeOffer.type}
          onRequest={() => requestTradeMutation.mutate({
            tradeOfferId: activeOffer.tradeOfferId,
            receiverComicId: activeOffer.tradeOffer.comicId,
          })}
          onClose={() => setActiveOffer(null)}
        />
      ) : null}
      {onProfile ? null : <OfferListHeadings />}
      {offers.map((offer, idx) => (
        <OfferItem
          key={offer.tradeOffer.comicId}
          index={idx + 1}
          type={offer.type}
          price={offer.price}
          tradeOffer={offer.tradeOffer}
          createdBy={offer.createdBy}
          createdAt={offer.createdAt}
          onProfile={onProfile}
          onTrade={() => viewTradeHandler(offer)}
        />
      ))}
    </section>
  );
};

export default Offers;
