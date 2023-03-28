import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import UserBio from './UserBio';
import Tabs from './Tabs';
import Collection from './Collection';
import { getComicBookCollector } from '@/api';

const CollectorDetails = () => {
  const { query } = useRouter();
  const {
    data: collectorData,
    isLoading,
    isError,
  } = useQuery([`collector-${query.collectorId}`, query.collectorId], {
    queryFn: () => getComicBookCollector(query.collectorId as string),
  });
  const [currViewIdx, setCurrViewIdx] = useState(0);

  const switchHandler = (tabIndex: number) => {
    setCurrViewIdx(tabIndex);
  };

  if (isLoading) {
    // TODO: Replace with loader component
    return <span>Loading...</span>;
  }

  if (isError) {
    // TODO: Replace with alert/error component
    return <span>Failed to retrieve collector!</span>;
  }

  return (
    <>
      <UserBio info={collectorData} />
      <Tabs onSwitch={switchHandler} />
      {/* @ts-ignore */}
      {currViewIdx === 0 && <Collection comics={collectorData.collection} />}
    </>
  );
};

export default CollectorDetails;
