/* eslint-disable arrow-body-style */
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

type Comic = {
  comicId: string;
  title: string;
  imageUrl: string;
};

const DUMMY_COMICS: Comic[] = [
  {
    comicId: '32',
    title: 'Spiderman',
    imageUrl:
      'https://imgs.search.brave.com/5wkHrmwhzbfOupHFbhzMRPyHl5-VMi_D2aFV-HCE3Jo/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pLmFu/bmloaWwudXMvdS9w/cm9kL21hcnZlbC9p/L21nLzMvNjAvNTdl/OTY0MjJiMzRhMy9j/bGVhbi5qcGc',
  },
];

type Props = {
  isEdit: boolean;
};

const Comics: React.FC<Props> = ({ isEdit }) => {
  // const {data: comicsData} = useQuery(...);
  // const mutation = useMutation(...);

  const removeComicHandler = (id: string) => {
    // mutation.mutate(id, {
    // mutateFn: deleteComicFromUserCollection(id)
    // });
  };

  return (
    <div>
      {DUMMY_COMICS.map(({ comicId, imageUrl }) => (
        <div className="relative max-width-full w-max">
          <Image
            className={isEdit ? 'opacity-75' : ''}
            src={imageUrl}
            alt=""
            width={320}
            height={520}
          />
          {isEdit && (
            <button
              className="absolute top-3 right-2"
              type="button"
              onClick={() => removeComicHandler(comicId)}
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
