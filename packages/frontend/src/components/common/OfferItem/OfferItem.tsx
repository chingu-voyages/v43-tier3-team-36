import clsx from 'clsx';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

export interface IOfferItem {
  type: string;
  status?: string;
  price: number;
  createdAt: string;
  createdBy: {
    userId: string;
    username: string;
  };
  tradeOffer: {
    comicId: string;
    title: string;
  };
}

interface IOfferItemProps extends IOfferItem {
  index: number;
  onProfile?: boolean;
  onTrade?: () => void;
}

export const OfferItem: React.FC<IOfferItemProps> = ({
  index,
  status,
  type,
  price,
  createdAt,
  createdBy,
  tradeOffer,
  onProfile,
  onTrade,
}) => {
  const DUMMY_COMIC_DETAILS = {
    issue: 8,
    imageUrl:
      'https://cdn.marvel.com/u/prod/marvel/i/mg/3/60/6227804f029af/clean.jpg',
  };

  if (status === 'fulfilled') {
    return null;
  }

  return (
    <article
      className={clsx(
        'md:grid md:grid-cols-[minmax(0,_50px)_4fr_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)] md:items-center md:justify-items-center my-4 p-4 md:px-6 border rounded-xl hover:bg-gray-50 text-gray-800 font-medium',
        {
          'md:grid md:grid-cols-[minmax(0,_50px)_4fr_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)]':
            onProfile,
        },
      )}
    >
      <div className="flex justify-between text-sm md:hidden">
        <div className="flex items-center ">
          <span className="block mr-4">
            <img
              className="w-16 h-16 rounded-lg"
              src={DUMMY_COMIC_DETAILS.imageUrl}
              alt=""
            />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold">{tradeOffer.title}</span>
            <span
              className={clsx('font-medium text-gray-500', {
                hidden: onProfile,
              })}
            >
              {`@${createdBy.username}`}
            </span>
          </div>
        </div>
        <div className="flex self-start text-sm">
          {type === 'EXCHANGE' && (
            <Button className="ml-auto uppercase w-fit md:ml-0">exg</Button>
          )}
          {type === 'BUY' && (
            <Button className="ml-auto uppercase w-fit md:ml-0">buy</Button>
          )}
        </div>
      </div>
      <div className="flex justify-between flex-shrink-0 mt-4 md:hidden">
        <div>
          <span className="text-xs text-gray-500">Price</span>
          <div>
            <span>{price}</span>
            <span className="ml-1 text-xs text-gray-500">USD</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-xs text-gray-500">Issue</span>
          <div>
            <Chip
              className="text-xs font-light bg-red-200 border border-red-600 w-fit text-darkgrey"
              label={`Issue #${DUMMY_COMIC_DETAILS.issue}`}
            />
          </div>
        </div>
      </div>
      <div className="hidden text-gray-500 md:block">{index}</div>
      <div className="hidden md:flex md:items-center">
        <img
          className="w-12 h-12 rounded-lg"
          src={DUMMY_COMIC_DETAILS.imageUrl}
          alt=""
        />
        <span className="ml-4 text-lg font-bold">{tradeOffer.title}</span>
      </div>
      <div className="hidden md:block">
        <div>
          <div>
            <span>{price}</span>
            <span className="ml-1 text-xs text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Chip
          className="text-xs font-light bg-red-200 border border-red-600 w-fit text-darkgrey"
          label={`Issue #${DUMMY_COMIC_DETAILS.issue}`}
        />
      </div>
      <div className="hidden md:block">
        <span>{createdAt}</span>
      </div>
      <div className={clsx('hidden md:block', { 'md:hidden': onProfile })}>
        <span className="font-medium text-gray-500">{`@${createdBy.username}`}</span>
      </div>
      <div className="hidden mt-4 text-sm md:flex md:mt-0">
        {type === 'EXCHANGE' && (
          <Button className="ml-auto uppercase w-fit md:ml-0" onClick={onTrade}>
            exg
          </Button>
        )}
        {type === 'SELL' && (
          <Button className="ml-auto uppercase w-fit md:ml-0" onClick={onTrade}>
            buy
          </Button>
        )}
      </div>
    </article>
  );
};
