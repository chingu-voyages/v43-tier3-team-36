import { useState } from 'react';
import { Filter, Search } from 'lucide-react';

import SearchInput from '@/components/common/SearchInput';
import Offers from './Offers';
import { type TTradeOfferQuery } from '@/api';

const ExploreOffers: React.FC = () => {
  const [query, setQuery] = useState<TTradeOfferQuery>({});

  const searchInputBlurHandler = (newQuery: TTradeOfferQuery) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };

  return (
    <section className="relative my-6 md:my-8 min-h-[22rem]">
      <div className="flex justify-center mt-8 mb-10 gap-x-3">
        <SearchInput
          Icon={<Search />}
          placeholder="Search for a trade offer..."
          onUpdate={(term) => searchInputBlurHandler({ comic: term })}
        />
        <SearchInput
          Icon={<Filter />}
          placeholder="Filter by location..."
          onUpdate={(loc) => searchInputBlurHandler({ location: loc })}
        />
      </div>
      <Offers query={query} />
    </section>
  );
};

export default ExploreOffers;
