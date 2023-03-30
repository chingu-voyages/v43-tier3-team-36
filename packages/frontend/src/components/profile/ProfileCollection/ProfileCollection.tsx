import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import Comics from './Comics';
import Actions from './Actions';
import UseAlertStore from '@/store/store';
import { removeComic } from '@/api';

const ProfileComics: React.FC = () => {
  const setAlert = UseAlertStore((state: any) => state.setAlert);
  const [isEdit, setIsEdit] = useState(false);

  const removeComicMutation = useMutation({
    mutationFn: removeComic,
    onSuccess: (data) => {
      setAlert({ type: 'success', message: data.message });
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err,
      });
    },
  });

  const removeComicHandler = (id: number) => {
    removeComicMutation.mutate(id);
  };

  const toggleEditHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  const disableActions = removeComicMutation.isLoading;

  return (
    <section>
      <h2 className="font-bold">Your Collection</h2>
      <Comics isEdit={isEdit} onRemoveComic={removeComicHandler} />
      <Actions disabled={disableActions} onEdit={toggleEditHandler} />
    </section>
  );
};

export default ProfileComics;
