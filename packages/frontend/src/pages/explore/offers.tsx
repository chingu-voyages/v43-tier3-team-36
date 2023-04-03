import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import AuthLayout from '@/layouts/AuthLayout';
import ExploreLayout from '@/layouts/ExploreLayout';
import ExploreOffers from '@/components/explore/ExploreCollectors/ExploreOffers';

const Offers: NextPageWithLayout = () => <ExploreOffers />;

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
