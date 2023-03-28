import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';

import Collectors from './Collectors';
import SearchInput from '@/components/common/SearchInput';
import type { TComicBookCollectorQuery } from '@/api';
import { getComicBookCollectors } from '@/api';

const ExploreCollectors: React.FC = () => {
  const [query, setQuery] = useState<TComicBookCollectorQuery>();
  const {
    data: collectorsData,
    isLoading,
    isError,
  } = useQuery(['collectors'], {
    queryFn: () => getComicBookCollectors(query),
  });

  const searchInputBlurHandler = (newQuery: TComicBookCollectorQuery) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };

  if (isLoading) {
    // TODO: Replace with loader component
    return <span>Loading...</span>;
  }

  if (isError) {
    // TODO: Replace with alert/error component
    return <span>Failed to retrieve collectors!</span>;
  }

  return (
    <>
      <div className="flex justify-center gap-x-3 mt-8 mb-10">
        <SearchInput
          Icon={<Search />}
          placeholder="Search for a collector..."
          onUpdate={(term) => searchInputBlurHandler({ username: term })}
        />
        <SearchInput
          Icon={<Filter />}
          placeholder="Filter by location..."
          onUpdate={(loc) => searchInputBlurHandler({ location: loc })}
        />
      </div>
      <Collectors collectors={collectorsData} />
    </>
  );
};

export default ExploreCollectors;
