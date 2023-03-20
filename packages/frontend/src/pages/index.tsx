import { type ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';

const Home: NextPageWithLayout = () => <div>Hello, World!</div>;

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      seo={{
        title: 'Marvel Collector | Trading Site',
        meta: {
          description:
            'Marvel Collector is a trading site trade with other collectors in a all-inclusive community that has a passion for Marvel comics',
        },
      }}
    >
      {page}
    </Layout>
  );
};

export default Home;
