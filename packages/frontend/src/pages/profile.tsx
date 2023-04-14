import { type ReactElement } from 'react';

import type { NextPageWithLayout } from './_app';
import AuthLayout from '@/layouts/AuthLayout';
import ProfileCollection from '@/components/profile/ProfileCollection';
import ProfileOffers from '@/components/profile/ProfileOffers';

const Profile: NextPageWithLayout = () => (
  <main className="flex flex-col gap-y-2 py-8 px-4">
    <ProfileCollection />
    <ProfileOffers />
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
