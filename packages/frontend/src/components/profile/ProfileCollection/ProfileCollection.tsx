import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { CollectionItemPartial } from '@marvel-collector/types';

import Comics from './Comics';
import CollectionActions from './CollectionActions';
import NewTradeOffer from './NewTradeOffer';
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
  const [isTrade, setIsTrade] = useState(false);
  const [activeComic, setActiveComic] = useState<CollectionItemPartial | null>(
    null,
  );

  const removeComicHandler = (id: number) => {
    removeComicMutation.mutate(id);
  };

  const pickComicHandler = (pickedComic: CollectionItemPartial) => {
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
        <h2 className="flex flex-col mb-8 font-bold">Your Collection</h2>
        {isTrade && (
          <p className="mb-3 text-center md:text-left">
            Please select a comic below
          </p>
        )}
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
