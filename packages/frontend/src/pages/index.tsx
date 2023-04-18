import { type ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';
import Hero from '@/components/landing/Hero';
import { CTA, Features, Stats } from '@/components/landing';
import LandingLayout from '@/layouts/LandingLayout';

const Home: NextPageWithLayout = () => (
  <>
    <Hero
      label="The #1 comic marketplace"
      headline="Trade comics easily"
      uspText="Welcome to Marvel Collector, where we take comic trade to a whole new level! Our market-place offers to buy, sell and exchange comic books from anywhere."
    />
    <Features />
    <Stats />
    <CTA heading="Ready to go next level?" />
  </>
);

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
      <LandingLayout>{page}</LandingLayout>
    </Layout>
  );
};

export default Home;
