import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import type { CollectionItemPartial } from '@marvel-collector/types';

import Loader from '@/components/common/Loader';
import useAlertStore from '@/store/store';
import { getCurrentUserDetails, removeComic } from '@/api';
import { COMIC_FALLBACK } from '@/data/constants';

type Props = {
  isPick: boolean;
  isEdit: boolean;
  onPick: (comic: CollectionItemPartial) => void;
};

const CollectionList: React.FC<Props> = ({ isPick, isEdit, onPick }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const queryClient = useQueryClient();
  const { data: userData, isLoading } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
    retry: false,
  });

  const removeComicMutation = useMutation({
    mutationFn: removeComic,
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setAlert({ type: 'success', message });
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err as string,
      });
    },
  });

  if (isLoading) {
    return <Loader label="Loading Collection..." />;
  }

  // @ts-ignore
  if (!userData?.collection || userData?.collection.length === 0) {
    return (
      <p className="py-32 mx-auto text-xl text-center">
        There are no comics in your collection...
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-3 overflow-x-auto lg:grid-cols-none lg:grid-flow-col justify-items-center gap-y-5 lg:gap-x-2">
      {/* @ts-ignore */}
      {userData.collection.map((comic: CollectionItemPartial) => (
        <li
          key={comic.id}
          className={twMerge(
            clsx(
              'relative w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64 max-w-full',
              { 'hover:ring-4': isPick },
            ),
          )}
        >
          <Image
            className={clsx('rounded', { 'opacity-75': isEdit })}
            src={comic.imageUrl || COMIC_FALLBACK}
            alt={comic.title || ''}
            fill
            onClick={isPick ? () => onPick(comic) : undefined}
          />
          {isEdit && (
            <button
              className="absolute top-3 right-2"
              type="button"
              onClick={() => removeComicMutation.mutate(comic.comicId as number)}
            >
              <Trash2 />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
