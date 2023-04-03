import { ReactElement, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { InputField } from '@/components/ui';
import { NextPageWithLayout } from '../_app';
import AuthLayout from '@/layouts/AuthLayout';
import OfferList from '@/components/ui/OfferList/OfferList';
import ExploreLayout from '@/layouts/ExploreLayout';

const Offers: NextPageWithLayout = () => {
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
      <OfferList />
    </section>
  );
};

Offers.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Explore | Offers',
        meta: {
          description:
            'View, buy and exchange comic offers from around the world',
        },
      }}
    >
      <ExploreLayout>{page}</ExploreLayout>
    </AuthLayout>
  );
};

export default Offers;
