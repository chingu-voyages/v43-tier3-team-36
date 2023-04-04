import type { ReactElement } from 'react';

import type { NextPageWithLayout } from './_app';
import Layout from '@/layouts/Layout';
import AuthLogin from '@/components/auth/AuthLogin';

const Login: NextPageWithLayout = () => (
  <main className="flex flex-col items-center justify-center h-screen px-4">
    <AuthLogin />
  </main>
);

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      seo={{
        title: 'Login',
        meta: {
          description: 'Login authentication page for already existing users',
        },
      }}
    >
      {page}
    </Layout>
  );
};

export default Login;
