import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Comics from './Comics';
import Actions from './Actions';
import { getCurrentUserDetails } from '@/api';

const ProfileComics: React.FC = () => {
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(['user'], {
    queryFn: () => getCurrentUserDetails(),
  });
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  if (isLoading) {
    // TODO: Replace with loader component
    return <span>Loading...</span>;
  }

  if (isError) {
    // TODO: Replace with alert/error component
    return <span>Failed to retrieve user!</span>;
  }

  return (
    <section>
      <h2 className="font-bold">Your Collection</h2>
      {/* @ts-ignore */}
      <Comics userId={userData.userId} isEdit={isEdit} />
      <Actions onEdit={toggleEditHandler} />
    </section>
  );
};

export default ProfileComics;
