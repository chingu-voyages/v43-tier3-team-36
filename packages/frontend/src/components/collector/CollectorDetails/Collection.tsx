import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import ComicCard from '@/components/common/ComicCard';
import SearchInput from '@/components/common/SearchInput';

type Props = {
  comics: {
    id: number;
    title: string;
    issueNo: number;
    imageUrl?: string | undefined;
  }[];
};

const Collection: React.FC<Props> = ({ comics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredComics = useMemo(
    () => comics.filter((comic) => comic.title.toLowerCase().startsWith(searchTerm)),
    [comics, searchTerm],
  );

  return (
    <>
      <div className="mb-8">
        <SearchInput
          Icon={<Search />}
          placeholder="Search for a comic book..."
          onUpdate={(newTerm) => setSearchTerm(newTerm.toLowerCase())}
        />
      </div>
      <div className="grid auto-rows-1fr grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-col gap-3">
        {filteredComics.map(({ id, ...comic }) => (
          <ComicCard key={id} comic={comic} />
        ))}
      </div>
    </>
  );
};

export default Collection;
