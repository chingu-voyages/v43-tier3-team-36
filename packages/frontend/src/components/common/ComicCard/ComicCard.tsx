import Image from 'next/image';
import clsx from 'clsx';

import { Button, Chip } from '@/components/ui';

const COMIC_FALLBACK = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5876fe74-9e55-493f-a3e0-e95076ef3962/dfld4s6-678156d5-357d-4f01-83c8-39c555889984.jpg/v1/fill/w_1024,h_742,q_75,strp/comic_placeholder_1_by_oceanside7_dfld4s6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQyIiwicGF0aCI6IlwvZlwvNTg3NmZlNzQtOWU1NS00OTNmLWEzZTAtZTk1MDc2ZWYzOTYyXC9kZmxkNHM2LTY3ODE1NmQ1LTM1N2QtNGYwMS04M2M4LTM5YzU1NTg4OTk4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.0wYHMk-cn4o0BLbDEDyebHIAr7lj265-7yHRRcbmSGQ';

type Props = {
  comic: {
    title: string;
    issueNo: number;
    imageUrl?: string;
  };
  large?: boolean;
  withBorder?: boolean;
  onAddComic?: () => void;
};

const ComicCard: React.FC<Props> = ({
  comic,
  large,
  onAddComic,
  withBorder,
}) => {
  const { imageUrl, title, issueNo } = comic;

  return (
    <div
      className={`w-${large ? '84' : '60'} p-2 bg-white ${
        withBorder ? 'border' : ''
      } border-gray-200 rounded-lg`}
    >
      <Image
        className="rounded-md mb-2"
        src={imageUrl || COMIC_FALLBACK}
        alt=""
        width={large ? 600 : 270}
        height={600}
      />
      <div className="items-end pt-2">
        <div>
          <h1 className="font-bold tracking-tight text-black-900 text-xl">
            {title}
          </h1>
          {/* TODO: Add comic book description */}
          {/* <p className="text-sm">{description}</p> */}
          <div className="flex justify-between items-end mt-2">
            <Chip className="bg-blue-500 " label={`Issue: ${issueNo}`} />
            {onAddComic && (
              <Button onClick={onAddComic} variant="outlined">
                Add
              </Button>
            )}
            {/* TODO: Add tags from comic book */}
            {/* {(genres as string[]).map((genre, idx) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="bg-green-400 rounded-full text-xs text-center p-1 ml-4"
              >
                {tag}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
