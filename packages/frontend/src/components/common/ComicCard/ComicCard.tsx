import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

type Props = {
  comic: any;
};

const ComicCard: React.FC<Props> = ({ comic }) => {
  const {
    img, title, description, issueNo, tags,
  } = comic;

  return (
    <article className="min-w-full border-2 rounded-md px-4 border-gray-200 pt-4 sm:min-w-0 sm:max-w-[18rem] lg:min-w-[21rem]">
      <Image
        className="w-full max-h-[15rem] object-fill rounded-md mb-2"
        src={img}
        alt=""
      />
      <div className="flex justify-between py-4">
        <div>
          <h4>{title}</h4>
          <p className="text-sm">{description}</p>
          <div className="mt-3">
            <span className="bg-red-400 rounded-full text-xs text-center p-1 mr-4">
              {issueNo}
            </span>
            {(tags as string[]).map((tag, idx) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className="bg-green-400 rounded-full text-xs text-center p-1 ml-4"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <MoreHorizontal cursor="pointer" fontSize="1.5rem" />
      </div>
    </article>
  );
};

export default ComicCard;
