import { useState } from 'react';
import type { CollectionItemPartial } from '@marvel-collector/types';

import NewTradeOffer from './NewTradeOffer';
import CollectionList from './CollectionList';
import CollectionActions from './CollectionActions';

const ProfileCollection: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const [activeComic, setActiveComic] = useState<CollectionItemPartial | null>(
    null,
  );

  const toggleEditHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  const toggleTradeHandler = () => {
    setIsTrade((prevState) => !prevState);
  };

  const pickComicHandler = (pickedComic: CollectionItemPartial) => {
    setActiveComic(pickedComic);
  };

  return (
    <section>
      <h2 className="flex flex-col mb-8 font-bold">Your Collection</h2>
      {activeComic ? (
        <NewTradeOffer
          key={activeComic.id}
          comic={activeComic}
          onClose={() => setActiveComic(null)}
        />
      ) : null}
      {isTrade && (
        <p className="mb-3 text-center md:text-left">
          Please select a comic below to trade
        </p>
      )}
      <div className="relative min-h-[20rem] px-2 py-5 mb-6 border md:py-11 md:px-8 bg-neutral-100 border-zinc-200 rounded-xl">
        <CollectionList
          isPick={isTrade}
          isEdit={isEdit}
          onPick={pickComicHandler}
        />
      </div>
      <CollectionActions
        onEdit={toggleEditHandler}
        onTrade={toggleTradeHandler}
      />
    </section>
  );
};

export default ProfileCollection;
