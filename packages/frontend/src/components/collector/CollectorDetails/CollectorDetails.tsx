import { useState } from 'react';

import Tabs from './Tabs';
import Collection from './Collection';

const TABS_VIEWS = [Collection];

const CollectorDetails = () => {
  const [currViewIdx, setCurrViewIdx] = useState(0);

  const switchHandler = (tabIndex: number) => {
    setCurrViewIdx(tabIndex);
  };

  return (
    <>
      <Tabs onSwitch={switchHandler} />
      {TABS_VIEWS[currViewIdx]}
    </>
  );
};

export default CollectorDetails;
