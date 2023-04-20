import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IOfferItem, OfferItem } from '@/components/common/OfferItem';
import { getCurrentUserDetails } from '@/api';
import RespondTradeModal from './RespondTradeModal/RespondTradeModal';

const Offers = () => {
  const { data: userData } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
  });
  const [activeOffer, setActiveOffer] = useState<any>(null);

  const viewTradeHandler = (offer: IOfferItem) => {
    setActiveOffer(offer);
  };

  return (
    <>
      {activeOffer ? (
        <RespondTradeModal
          key={activeOffer.id}
          offer={{
            type: activeOffer.type,
            status: activeOffer.status,
            ...activeOffer.tradeOfferItems,
          }}
          onClose={() => setActiveOffer(null)}
        />
      ) : null}
      <div>
        {/* @ts-ignore */}
        {userData && userData.tradeOfferDetail.length > 0 ? (
          <ul className="my-8">
            {/* @ts-ignore */}
            {userData.tradeOfferDetail.map((offer, idx) => (
              <OfferItem
                key={offer.tradeOfferId}
                index={idx + 1}
                type={offer.type}
                price={offer.price}
                tradeOffer={offer.tradeOfferItems}
                createdBy={{
                  // @ts-ignore
                  userId: userData.userId,
                  username: userData.username,
                }}
                createdAt={offer.createdAt}
                onProfile
                onTrade={() => viewTradeHandler(offer)}
              />
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-center">No Trade Offers Available...</p>
        )}
      </div>
    </>
  );
};

export default Offers;
