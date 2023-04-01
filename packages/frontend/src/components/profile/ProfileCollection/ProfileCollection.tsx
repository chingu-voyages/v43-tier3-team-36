import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Comics from './Comics';
import Actions from './Actions';
import UseAlertStore from '@/store/store';
import { getCurrentUserDetails, removeComic } from '@/api';

const ProfileCollection: React.FC = () => {
  const setAlert = UseAlertStore((state) => state.setAlert);
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(['user'], {
    queryFn: getCurrentUserDetails,
  });
  const removeComicMutation = useMutation({
    mutationFn: removeComic,
    onSuccess: (data) => {
      setAlert({ type: 'success', message: data.message });
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err as string,
      });
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  const removeComicHandler = (id: number) => {
    removeComicMutation.mutate(id);
  };

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

  const disableActions = removeComicMutation.isLoading;

  return (
    <section>
      <h2 className="font-bold">Your Collection</h2>
      {/* @ts-ignore */}
      <Comics
        userId={userData.userId}
        isEdit={isEdit}
        onRemoveComic={removeComicHandler}
      />
      <Actions disabled={disableActions} onEdit={toggleEditHandler} />
    </section>
  );
};

export default ProfileCollection;
