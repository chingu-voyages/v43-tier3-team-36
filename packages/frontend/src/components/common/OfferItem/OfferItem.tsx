import Image from 'next/image';
import clsx from 'clsx';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

import { COMIC_FALLBACK } from '@/data/constants';

export interface IOfferItem {
  type: string;
  // status?: string;
  price: number;
  createdAt: string;
  createdBy: {
    userId: string;
    username: string;
  };
  tradeOffer: {
    comicId: string;
    title: string;
    imageUrl?: string;
  };
}

interface IOfferItemProps extends IOfferItem {
  index: number;
  onProfile?: boolean;
  onTrade?: () => void;
}

export const OfferItem: React.FC<IOfferItemProps> = ({
  index,
  type,
  price,
  createdAt,
  createdBy,
  tradeOffer,
  onProfile,
  onTrade,
}) => {
  const { title, imageUrl } = tradeOffer;

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
          <div className="relative max-w-full mr-4">
            <Image
              className="w-16 h-16 rounded-lg"
              src={imageUrl || COMIC_FALLBACK}
              alt=""
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">{title}</span>
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
            <Button
              className="ml-auto uppercase w-fit md:ml-0"
              onClick={onTrade}
            >
              exg
            </Button>
          )}
          {type === 'BUY' && (
            <Button
              className="ml-auto uppercase w-fit md:ml-0"
              onClick={onTrade}
            >
              buy
            </Button>
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
            {/* NOTE: Need to get issue number of comic from backend */}
            <Chip
              className="text-xs font-light bg-red-200 border border-red-600 w-fit text-darkgrey"
              label={`Issue #${8}`}
            />
          </div>
        </div>
      </div>
      <div className="hidden text-gray-500 md:block">{index}</div>
      <div className="relative hidden max-w-full md:flex md:items-center">
        <Image
          className="w-12 h-12 rounded-lg"
          src={imageUrl || COMIC_FALLBACK}
          alt=""
          fill
        />
        <span className="ml-4 text-lg font-bold">{title}</span>
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
        {/* NOTE: Need to get issue number of comic from backend */}
        {/* <Chip
          className="text-xs font-light bg-red-200 border border-red-600 w-fit text-darkgrey"
          label={`Issue #${tradeOffer.issue}`}
        /> */}
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
