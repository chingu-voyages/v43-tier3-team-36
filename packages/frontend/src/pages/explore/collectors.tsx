import type { ReactElement } from 'react';

import type { NextPageWithLayout } from '../_app';
import AuthLayout from '@/layouts/AuthLayout';
import ExploreCollectors from '@/components/explore/ExploreCollectors/ExploreCollectors';
import ExploreLayout from '@/layouts/ExploreLayout';

const Collectors: NextPageWithLayout = () => (
  <ExploreCollectors />
);

Collectors.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Explore | Collectors',
        meta: {
          description:
            'Get in-contact with Marvel comic book collectors from around the world and trade like never before with the ability to trade anywhere, and anytime',
        },
      }}
    >
      <ExploreLayout>{page}</ExploreLayout>
    </AuthLayout>
  );
};

export default Collectors;
