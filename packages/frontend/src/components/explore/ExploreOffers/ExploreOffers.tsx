import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';

import Loader from '@/components/common/Loader';
import SearchInput from '@/components/common/SearchInput';
import Offers from './Offers';
import { type TTradeOfferQuery, getTradeOffers } from '@/api';
import UseAlertStore from '@/store/store';

const ExploreOffers: React.FC = () => {
  const setAlert = UseAlertStore((state) => state.setAlert);
  const [query, setQuery] = useState<TTradeOfferQuery>();
  const { data: offersData, isLoading } = useQuery(['offers'], {
    queryFn: () => getTradeOffers(query),
    onError: (err) => {
      if (err instanceof Error) {
        setAlert({
          type: 'error',
          message: err.message,
        });
      }
    },
  });

  const searchInputBlurHandler = (newQuery: TTradeOfferQuery) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };

  return (
    <section className="relative my-6 md:my-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          {offersData && offersData?.length > 0 ? (
            <Offers offers={offersData} />
          ) : (
            <span>No Trade Offers Available</span>
          )}
        </>
      )}
    </section>
  );
};

export default ExploreOffers;
