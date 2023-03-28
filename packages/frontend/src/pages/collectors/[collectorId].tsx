import type { ReactElement } from 'react';

import type { NextPageWithLayout } from '../_app';
import AuthLayout from '@/layouts/AuthLayout';
import CollectorDetails from '@/components/collector/CollectorDetails';

const Collector: NextPageWithLayout = () => (
  <main className="p-8">
    <CollectorDetails />
  </main>
);

Collector.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Collector',
        meta: {
          // eslint-disable-next-line @typescript-eslint/quotes
          description: `An overview of the collector's recent activity and trades, and as well as their current digital comics collection`,
        },
      }}
    >
      {page}
    </AuthLayout>
  );
};

export default Collector;
