import { Search } from 'lucide-react';

import ComicCard from '@/components/common/ComicCard';

const DUMMY_COMICS = [
  {
    id: Math.random().toString(),
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg',
    title: 'Hawkeye & Black Canary',
    description: 'lorem ipsum doing the doings...',
    issueNo: 12,
    tags: ['Action'],
  },
  {
    id: Math.random().toString(),
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/b2f85456102575.5609a4444387b.jpg',
    title: 'Hawkeye & Black Canary',
    description: 'lorem ipsum doing the doings...',
    issueNo: 12,
    tags: ['Action'],
  },
];

const Collection = () => (
  <>
    <div className="w-full rounded-lg h-8 bg-gray-200 flex mb-8 sm:w-1/2 ">
      <Search />
      <input
        className="pl-4 pr-1 w-full h-full rounded-lg bg-gray-200 outline-none"
        placeholder="search for a comic book..."
      />
    </div>
    <div className="flex justify-between gap-1 flex-wrap">
      {DUMMY_COMICS.map(({ id, ...comic }) => (
        <ComicCard key={id} comic={comic} />
      ))}
    </div>
  </>
);

export default Collection;
