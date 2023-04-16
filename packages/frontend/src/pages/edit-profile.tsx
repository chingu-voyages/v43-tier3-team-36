import { useState, type ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { NextPageWithLayout } from './_app';
import AuthLayout from '@/layouts/AuthLayout';
import { getCurrentUserDetails } from '@/api';

import { Button } from '@/components/ui';
import FormField from '@/components/common/FormField';

const EditProfile: NextPageWithLayout = () => {
  const { data: userData } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
    retry: false,
  });

  const [userDetails, setUserDetails] = useState({
    username: userData?.username,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    location: userData?.location,
    email: userData?.email,
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImage = (e: any) => {
    setProfileImage(e.target.files[0]);
    if (!profileImage) {
      console.log(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="w-full max-w-[500px] mx-auto px-6 pt-2  border-[1px] rounded-lg text-sm"
      onSubmit={handleSubmit}
    >
      <FormField
        id="username"
        label="username"
        placeholder="username"
        name="username"
        value={userDetails?.username}
        onChange={handleChange}
        register={() => console.log('')}
      />
      <FormField
        id="firstName"
        label="first name"
        placeholder="first name"
        name="firstName"
        value={userDetails.firstName}
        onChange={handleChange}
        register={() => console.log('')}
      />
      <FormField
        id="lastName"
        label="last name"
        placeholder="last name"
        name="lastName"
        value={userDetails.lastName}
        onChange={handleChange}
        register={() => console.log('')}
      />
      <FormField
        id="email"
        label="email"
        placeholder="email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
        register={() => console.log('')}
      />
      <FormField
        id="location"
        label="location"
        placeholder="location"
        name="location"
        value={userDetails.location}
        onChange={handleChange}
        register={() => console.log('')}
      />
      <FormField
        id="profileImage"
        label="profile image"
        placeholder="profile image"
        type="file"
        name="profileImage"
        onChange={handleImage}
        accept="image/*"
        register={() => console.log('')}
      />
      <Button className="w-full py-4 my-8 text-base font-normal" type="submit">
        Update
      </Button>
    </form>
  );
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      seo={{
        title: 'Profile',
        meta: {
          description:
            'A profile page to edit your user details and upload your profile image',
        },
      }}
    >
      {page}
    </AuthLayout>
  );
};

export default EditProfile;
