import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';
import { Trash2 } from 'lucide-react';

import { getComicBookCollector } from '@/api';
import { createImageUrl } from '@/utils';
import type TComicItem from '@/types/comic';
import { COMIC_FALLBACK } from '@/data/constants';

type Props = {
  userId: string;
  isEdit: boolean;
  isPick: boolean;
  onRemoveComic: (id: number) => void;
  onPickComic: (comic: TComicItem) => void;
};

const Comics: React.FC<Props> = ({
  userId,
  isEdit,
  isPick,
  onRemoveComic,
  onPickComic,
}) => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(['user-comics', userId], {
    queryFn: () => getComicBookCollector(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    // TODO: Replace with loader component
    return <span>Loading...</span>;
  }

  if (isError) {
    // TODO: Replace with alert/error component
    return <span>Failed to retrieve comics!</span>;
  }

  return (
    <div className="grid grid-cols-3 px-2 py-5 mt-8 mb-6 overflow-x-auto border lg:grid-cols-none lg:grid-flow-col justify-items-center gap-y-5 lg:gap-x-2 md:py-11 md:px-8 bg-neutral-100 border-zinc-200 rounded-xl">
      {/* @ts-ignore */}
      {userData?.collection.map((comic) => (
        <div
          key={comic.id}
          className={twMerge(
            clsx(
              'relative w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64 max-w-full',
              { 'hover:ring': isPick },
            ),
          )}
        >
          <Image
            className={clsx({ 'opacity-75': isEdit })}
            src={createImageUrl(comic.images) || COMIC_FALLBACK}
            alt=""
            fill
            onClick={isPick ? () => onPickComic(comic) : undefined}
          />
          {isEdit && (
            <button
              className="absolute top-3 right-2"
              type="button"
              onClick={() => onRemoveComic(comic.id)}
            >
              <Trash2 />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comics;
