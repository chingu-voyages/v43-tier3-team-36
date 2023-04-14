import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  OfferItem,
  type IOfferItem,
} from '@/components/common/OfferItem/OfferItem';
import TradeOfferDialog from './TradeOfferDialog';
import { TTradeOfferQuery, getTradeOffers } from '@/api';
import useAlertStore from '@/store/store';
import Loader from '@/components/common/Loader';

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
  query: TTradeOfferQuery;
  onProfile?: boolean;
};

const Offers: React.FC<Props> = ({ query, onProfile }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const { data: offersData, isLoading } = useQuery(['offers'], {
    queryFn: () => getTradeOffers(query),
    onError: (err) => {
      if (err instanceof Error) {
        setAlert({
          type: 'error',
          message: err.message,
        });
      }
    },
  });
  const [activeOffer, setActiveOffer] = useState<any>(null);

  const viewTradeHandler = (offer: IOfferItem) => {
    setActiveOffer(offer);
  };

  if (isLoading) {
    return <Loader label="Loading Offers..." />;
  }

  return (
    <>
      {activeOffer ? (
        <TradeOfferDialog
          key={activeOffer.id}
          offer={{
            type: activeOffer.type,
            wantedComicId: activeOffer.wantedComicId,
            ...activeOffer.tradeOffer,
          }}
          onClose={() => setActiveOffer(null)}
        />
      ) : null}
      <div>
        {onProfile ? null : <OfferListHeadings />}
        {offersData && offersData.length > 0 ? (
          <ul className="my-8">
            {offersData.map((offer, idx) => (
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
          </ul>
        ) : (
          <p className="mt-12 text-center">No Trade Offers Available..</p>
        )}
      </div>
    </>
  );
};

export default Offers;
