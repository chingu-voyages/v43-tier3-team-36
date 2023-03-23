import React from 'react';
import TComicItem from '@/types/comic';
import { ComicCard } from './ComicCard';
import { trimString, createImageUrl } from '@/utils/';

export const ComicList = ({
  comics,
  isLoading,
}: {
  comics: TComicItem[];
  isLoading: boolean;
}) => {
  if (isLoading) return <h6>Fetching comics</h6>;
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {comics?.map((comic) => (
        <ComicCard
          key={comic.id}
          title={trimString(comic.title, 15, true)}
          issue={comic.issueNumber}
          imageUrl={createImageUrl(comic.images)}
          onAction={() => alert(`You selected comic with id ${comic.id}}`)}
        />
      ))}
    </div>
  );
};

export default ComicList;
