import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Button, Chip, Modal } from '@/components/ui';
import TComicItem from '@/types/comic';
import { createImageUrl } from '@/utils';
import { COMIC_FALLBACK } from '@/data/constants';
import { getUsersWithComic } from '@/api';

type TComicDetailProps = {
  comic: TComicItem;
  onClose: () => void;
};

const CollectorDetail = ({ comicId }: { comicId: number }) => {
  const { data } = useQuery(['collectors-with-comic'], {
    queryFn: () => getUsersWithComic(comicId),
  });

  if (!data?.length) return <div>No users with this comic</div>;

  return (
    <div className="overflow-x-auto flex gap-4 w-full flex-wrap max-h-96">
      {data?.map((item) => (
        <div className="border-2 p-4 rounded w-[350px] flex flex-col justify-between">
          <div className="flex align-top gap-4 mb-2">
            <div>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="profile-img"
                className="m-auto rounded-full w-16 h-16 object-cover"
              />
            </div>
            <div>
              <div>
                Username:
                {item.username}
              </div>
              <div>
                Location:
                {item.location || 'Unknown'}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full">Contact</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export const ComicDetail = ({ comic, onClose }: TComicDetailProps) => (
  <Modal
    title="View comic"
    onUnmount={onClose}
    className="sm:max-w-lg md:max-w-4xl lg:max-w-7xl"
  >
    <div className="grid grid-cols-6 grid-rows-1 gap-2 px-4 py-6">
      <div className="col-span-4">
        <div className="text-2xl font-semibold flex items-center gap-2">
          {comic.title}
          <Chip
            label={`Issue: ${comic.issueNumber.toString()}`}
            className="inline-block bg-blue-500 "
          />
        </div>
        <div className="text-lg mt-1 text-gray-700 font-light italic">
          {`Series: ${comic.series.name}`}
        </div>
        <hr className="h-px bg-gray-200 border-0 my-6" />
        <div>
          <div className="text-lg mb-4">Other collectors with this comic</div>
          <CollectorDetail comicId={comic.id} />
        </div>
      </div>
      <div className="flex justify-end col-span-2">
        <Image
          src={createImageUrl(comic.images) || COMIC_FALLBACK}
          width={350}
          height={500}
          className="rounded m-3 shadow-xl"
          alt="comic image"
        />
      </div>
    </div>
  </Modal>
);

export default ComicDetail;
