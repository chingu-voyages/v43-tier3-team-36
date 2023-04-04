import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { InputField } from '@/components/ui';
import Offers from './Offers';

const ExploreOffers: React.FC = () => {
  // request explore offers data from api

  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = (inputValue: string) => setSearchQuery(inputValue);

  return (
    <section className="my-6 md:my-8">
      <InputField
        placeholder="Search for a comic book offer"
        Icon={<MagnifyingGlassIcon className="h-5 w-5 text-grey-800" />}
        fullWidth
        value={searchQuery}
        onChange={handleChange}
      />
      <Offers />
    </section>
  );
};

export default ExploreOffers;
