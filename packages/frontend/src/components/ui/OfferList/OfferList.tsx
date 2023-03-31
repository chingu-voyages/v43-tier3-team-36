import { OfferItem, IOfferList } from '@/components/ui/OfferItem/OfferItem';

const DUMMY_OFFERS: IOfferList[] = [
  {
    comicId: 'marv-58',
    comicName: 'Marvel Wolverine',
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
    issue: 7,
    createdBy: 'yourstruly',
    createdOn: '15/04/23',
    type: 'exg',
  },
  {
    comicId: 'marv-22',
    comicName: 'Marvel Wolverine',
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
    issue: 7,
    createdBy: 'yourstruly',
    createdOn: '15/04/23',
    type: 'exg',
  },
  {
    comicId: 'marv-76',
    comicName: 'Marvel Wolverine',
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
    issue: 7,
    createdBy: 'yourstruly',
    createdOn: '15/04/23',
    type: 'sell',
  },
  {
    comicId: 'marv-50',
    comicName: 'Marvel Wolverine',
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
    issue: 7,
    createdBy: 'yourstruly',
    createdOn: '15/04/23',
    type: 'exg',
  },
  {
    comicId: 'marv-5',
    comicName: 'Marvel Wolverine',
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
    issue: 7,
    createdBy: 'yourstruly',
    createdOn: '15/04/23',
    type: 'sell',
  },
];

const HEADINGS = [
  '#',
  'comic book',
  'comic issue',
  'created time',
  'collector',
  'trade type',
];

const OfferListHeadings = () => (
  <div className="hidden md:grid md:grid-cols-[minmax(0,_50px)_4fr_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)] px-4 md:px-6 ">
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

const OfferList = () => (
  <section className="my-8">
    <OfferListHeadings />
    {DUMMY_OFFERS.map((offer, index) => (
      <OfferItem
        index={index + 1}
        key={offer.comicId}
        comicName={offer.comicName}
        imageUrl={offer.imageUrl}
        issue={offer.issue}
        createdBy={offer.createdBy}
        createdOn={offer.createdOn}
        type={offer.type}
      />
    ))}
  </section>
);

export default OfferList;
