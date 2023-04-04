import { useQuery } from '@tanstack/react-query';
import { getTradeOffers } from '@/api';
import { IOfferItem, OfferItem } from '@/components/common/OfferItem/OfferItem';

type Props = {
  onProfile?: boolean;
};

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
        className="uppercase text-xs text-gray-600"
      >
        {heading}
      </span>
    ))}
  </div>
);

const Offers = ({ onProfile }: Props) => {
  const { data } = useQuery(['trade-offers'], {
    queryFn: getTradeOffers,
  });

  // handle loading states w ui

  return (
    <section className="my-8">
      {onProfile ? null : <OfferListHeadings />}

      {/* map dummy offers for now */}
      {data.map((offer: IOfferItem, index: number) => (
        <OfferItem
          index={index + 1}
          key={offer.tradeOffer.comicId}
          type={offer.type}
          price={offer.price}
          tradeOffer={offer.tradeOffer}
          createdBy={offer.createdBy}
          createdAt={offer.createdAt}
          onProfile={onProfile}
        />
      ))}
    </section>
  );
};

export default Offers;
