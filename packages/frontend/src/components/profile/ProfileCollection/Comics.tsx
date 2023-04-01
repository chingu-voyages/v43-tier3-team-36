import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';

import { getComicBookCollector } from '@/api';
import { createImageUrl } from '@/utils';

const COMIC_FALLBACK = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5876fe74-9e55-493f-a3e0-e95076ef3962/dfld4s6-678156d5-357d-4f01-83c8-39c555889984.jpg/v1/fill/w_1024,h_742,q_75,strp/comic_placeholder_1_by_oceanside7_dfld4s6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQyIiwicGF0aCI6IlwvZlwvNTg3NmZlNzQtOWU1NS00OTNmLWEzZTAtZTk1MDc2ZWYzOTYyXC9kZmxkNHM2LTY3ODE1NmQ1LTM1N2QtNGYwMS04M2M4LTM5YzU1NTg4OTk4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.0wYHMk-cn4o0BLbDEDyebHIAr7lj265-7yHRRcbmSGQ';

type Props = {
  userId: string;
  isEdit: boolean;
  onRemoveComic: (id: number) => void;
};

const Comics: React.FC<Props> = ({ userId, isEdit, onRemoveComic }) => {
  const {
    data: comicsData,
    isLoading,
    isError,
  } = useQuery(['user-comics'], {
    queryFn: () => getComicBookCollector(userId),
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
      {comicsData?.comics.map(({ id, images }) => (
        <div
          key={id}
          className="relative max-w-full w-28 sm:w-36 md:w-44 lg:w-56 h-36 sm:h-44 md:h-48 lg:h-64"
        >
          <Image
            className={clsx({ 'opacity-75': isEdit })}
            src={createImageUrl(images) || COMIC_FALLBACK}
            alt=""
            fill
          />
          {isEdit && (
            <button
              className="absolute top-3 right-2"
              type="button"
              onClick={() => onRemoveComic(id)}
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
