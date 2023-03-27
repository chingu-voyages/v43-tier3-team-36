import { type ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import AuthLayout from '@/layouts/AuthLayout';

const Profile: NextPageWithLayout = () => (
  <main>
    <div>Profile</div>
  </main>
);

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Profile',
        meta: {
          description:
            'A profile of your recent activity and trades, and as well as your current digital comics collection',
        },
      }}
    >
      {page}
    </AuthLayout>
  );
};

export default Profile;
