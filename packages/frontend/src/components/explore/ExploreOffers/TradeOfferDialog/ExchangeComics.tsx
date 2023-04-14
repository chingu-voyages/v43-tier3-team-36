import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';
import { ArrowLeftRight } from 'lucide-react';
import type { CollectionItem } from '@marvel-collector/types';

import Loader from '@/components/common/Loader';
import { Button, ListSelect, ListSelectOption } from '@/components/ui';
import { getCurrentUserDetails } from '@/api';
import { COMIC_FALLBACK } from '@/data/constants';

type Props = {
  wantedComicId: number;
  offer: any;
  onRequest: (comicId: number) => void;
};

const ExchangeComics: React.FC<Props> = ({
  wantedComicId,
  offer,
  onRequest,
}) => {
  const { data: userData, isLoading } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
  });
  const [selectedComic, setSelectedComic] = useState<CollectionItem>(
    // @ts-ignore
    () => userData?.collection[0] ?? null,
  );

  const isWantedComic = useMemo(
    () => selectedComic?.comicId === wantedComicId,
    [selectedComic?.comicId, wantedComicId],
  );

  if (isLoading) {
    return <Loader label="Loading Offer..." />;
  }

  return (
    <>
      <div className="my-4">
        <p
          className={twMerge(
            clsx('text-center text-red-500 mb-5', {
              'text-green-500': isWantedComic,
            }),
          )}
        >
          {`You are ${isWantedComic ? 'able' : 'unable'} to make this exchange`}
        </p>
        <section className="grid grid-cols-3 grid-rows-1">
          <div>
            <div className="relative max-w-full mx-auto w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64">
              <Image
                className={clsx('rounded', {
                  'opacity-75': !isWantedComic,
                })}
                src={selectedComic?.imageUrl || COMIC_FALLBACK}
                alt=""
                fill
                priority
              />
            </div>
            <h2 className="mt-5 text-md md:text-lg lg:text-2xl font-medium text-center w-[95%] max-w-[35ch] mx-auto">
              {selectedComic?.title}
            </h2>
          </div>
          <ArrowLeftRight className="place-self-center" size={64} />
          <div>
            <div className="relative max-w-full mx-auto w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64">
              <Image
                className="rounded"
                // @ts-ignore
                src={offer.imageUrl || COMIC_FALLBACK}
                alt=""
                fill
                priority
              />
            </div>
            <h2 className="mt-5 text-md md:text-lg lg:text-2xl font-medium text-center w-[95%] max-w-[35ch] mx-auto">
              {offer.title}
            </h2>
          </div>
        </section>
      </div>
      {/* @ts-ignore */}
      {userData?.collection ? (
        <ListSelect
          // @ts-ignore
          data={userData.collection}
          labelKey="title"
          btnStyles=""
        >
          {/* @ts-ignore  */}
          {userData.collection.map((comic) => (
            <ListSelectOption
              key={comic.id}
              value={comic}
              onClick={() => setSelectedComic(comic)}
            >
              {comic.title}
            </ListSelectOption>
          ))}
        </ListSelect>
      ) : null}
      <Button
        className="mx-auto mt-5 mb-5"
        onClick={() => onRequest(selectedComic.comicId)}
      >
        Request
      </Button>
    </>
  );
};

export default ExchangeComics;
