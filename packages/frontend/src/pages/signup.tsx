import type { ReactElement } from 'react';

import type { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';
import { AuthSignup } from '@/components/auth/AuthSignup';

const Signup: NextPageWithLayout = () => (
  <main className="flex flex-col items-center justify-center px-4 py-12">
    <AuthSignup />
  </main>
);

Signup.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      seo={{
        title: 'Profile',
        meta: {
          description:
            'A profile of your recent activity and trades, and as well as your current digital comics collection',
        },
      }}
    >
      {page}
    </Layout>
  );
};

export default Signup;
