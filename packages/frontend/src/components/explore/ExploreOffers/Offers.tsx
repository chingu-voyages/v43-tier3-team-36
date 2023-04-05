import { OfferItem, IOfferItem } from '@/components/common/OfferItem/OfferItem';

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
  offers: IOfferItem[];
  onProfile?: boolean;
};

const Offers: React.FC<Props> = ({ offers, onProfile }) => (
  <section className="my-8">
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
      />
    ))}
  </section>
);

export default Offers;
