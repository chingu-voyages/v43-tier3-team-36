import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Comics from './Comics';
import CollectionActions from './CollectionActions';
import UseAlertStore from '@/store/store';
import { getCurrentUserDetails, removeComic } from '@/api';
import NewTradeOffer from './NewTradeOffer';
import TComicItem from '@/types/comic';

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
  const [isTrade, setIsTrade] = useState(false);
  const [activeComic, setActiveComic] = useState<TComicItem | null>(null);

  const removeComicHandler = (id: number) => {
    removeComicMutation.mutate(id);
  };

  const pickComicHandler = (pickedComic: TComicItem) => {
    setActiveComic(pickedComic);
  };

  const toggleEditHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  const toggleTradeHandler = () => {
    setIsTrade((prevState) => !prevState);
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
    <>
      <section>
        <h2 className="font-bold">Your Collection</h2>
        {isTrade && <p>Please select a comic below</p>}
        <Comics
          // @ts-ignore
          userId={userData?.userId}
          isEdit={isEdit}
          isPick={isTrade}
          onRemoveComic={removeComicHandler}
          onPickComic={pickComicHandler}
        />
        <CollectionActions
          disabled={disableActions}
          onEdit={toggleEditHandler}
          onTrade={toggleTradeHandler}
        />
      </section>
      {activeComic ? (
        <NewTradeOffer
          key={activeComic.id}
          comic={activeComic}
          onClose={() => setActiveComic(null)}
        />
      ) : null}
    </>
  );
};

export default ProfileCollection;
