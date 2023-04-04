import { useQuery } from '@tanstack/react-query';
import { getTradeOffers } from '@/api';
import { IOfferItem, OfferItem } from '@/components/common/OfferItem/OfferItem';

type Props = {
  onProfile?: boolean;
};

// const DUMMY_OFFERS: IOfferItem[] = [
//   {
//     type: 'BUY',
//     status: 'pending',
//     price: 405,
//     createdAt: '15/03/23',
//     createdBy: {
//       userId: 'aibds-52nsio-78',
//       username: 'yourstruly',
//     },
//     tradeOffer: {
//       comicId: 'marv-wyu-90-rs89',
//       title: 'Marvel Wolverine',
//     },
//   },
//   {
//     type: 'EXCHANGE',
//     status: 'pending',
//     price: 45,
//     createdAt: '16/03/23',
//     createdBy: {
//       userId: 'aibds-52nsio-78',
//       username: 'yourstruly',
//     },
//     tradeOffer: {
//       comicId: 'marv-hav-76-ky78',
//       title: 'Marvel Wolverine',
//     },
//   },
//   {
//     type: 'EXCHANGE',
//     status: 'pending',
//     price: 725,
//     createdAt: '01/02/23',
//     createdBy: {
//       userId: 'aibds-52nsio-78',
//       username: 'yourstruly',
//     },
//     tradeOffer: {
//       comicId: 'marv-hav-30-cy42',
//       title: 'Marvel Wolverine',
//     },
//   },
//   {
//     type: 'BUY',
//     status: 'pending',
//     price: 315,
//     createdAt: '25/01/23',
//     createdBy: {
//       userId: 'aibds-52nsio-78',
//       username: 'yourstruly',
//     },
//     tradeOffer: {
//       comicId: 'marv-hav-15-fz44',
//       title: 'Marvel Wolverine',
//     },
//   },
//   {
//     type: 'BUY',
//     status: 'pending',
//     price: 20,
//     createdAt: '12/02/23',
//     createdBy: {
//       userId: 'aibds-52nsio-78',
//       username: 'yourstruly',
//     },
//     tradeOffer: {
//       comicId: 'marv-hav-94-nx93',
//       title: 'Marvel Wolverine',
//     },
//   },
// ];

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
