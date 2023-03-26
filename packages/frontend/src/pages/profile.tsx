import { type ReactElement, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import type { NextPageWithLayout } from './_app';
import AuthLayout from '@/layouts/AuthLayout';
import { ProfileDetails } from '@/components/ui';
import Collections from '@/components/ui/Collections/Collections';
import Activities from '@/components/ui/Activities/Activities';

const Profile: NextPageWithLayout = () => {
  const [collection, setCollection] = useState(true);

  return (
    <main className="p-8">
      <ProfileDetails
        img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        name="Lilly Rose"
        description="Avid Comic Collector"
        location="Location: Manchester City, UK"
      />
      <div className="flex mb-4 pr-2">
        <button
          type="button"
          className={`${collection ? 'pr-4 font-bold' : 'pr-4'}`}
          onClick={() => setCollection(true)}
        >
          Collection
        </button>
        <button
          type="button"
          className={`${collection ? 'pr-4' : 'pr-4 font-bold '}`}
          onClick={() => setCollection(false)}
        >
          Activity
        </button>
      </div>
      <div className="w-full rounded-lg h-8 bg-gray-200 flex mb-8 sm:w-1/2 ">
        <AiOutlineSearch className="self-center pl-4" fontSize="2rem" />
        <input
          className="pl-4 pr-1 w-full h-full rounded-lg bg-gray-200 outline-none"
          placeholder="search for a comic book..."
        />
      </div>
      {collection ? <Collections /> : <Activities />}
    </main>
  );
};

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
