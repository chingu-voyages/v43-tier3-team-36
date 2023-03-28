import ComicCard from '@/components/common/ComicCard';
import type TComicItem from '@/types/comic';
import { trimString, createImageUrl } from '@/utils';

const ComicList = ({
  comics,
  isLoading,
  onAddComic,
}: {
  comics: TComicItem[];
  isLoading: boolean;
  onAddComic: (comic: TComicItem) => void;
}) => {
  const addComicHandler = (comic: TComicItem) => {
    onAddComic(comic);
  };

  if (isLoading) {
    return <h6>Fetching comics</h6>;
  }

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {comics.map((comic) => (
        <ComicCard
          key={comic.id}
          comic={{
            title: trimString(comic.title, 15, true),
            issueNo: comic.issueNumber,
            imageUrl: createImageUrl(comic.images),
          }}
          onAddComic={() => addComicHandler(comic)}
        />
      ))}
    </div>
  );
};

export default ComicList;
