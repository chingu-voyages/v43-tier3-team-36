import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  onSwitch: (index: number) => void;
};

const COLLECTOR_TABS = ['Collection', 'Trades'];

const Tabs: React.FC<Props> = ({ onSwitch }) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const toggleTabHandler = (tabIndex: number) => {
    setActiveTabIdx(tabIndex);
    onSwitch(tabIndex);
  };

  return (
    <div className="flex mb-4 pr-2">
      {COLLECTOR_TABS.map((tabTitle, idx) => (
        <button
          type="button"
          className={clsx('pr-4', { 'font-bold': activeTabIdx === idx })}
          onClick={() => toggleTabHandler(idx)}
        >
          {tabTitle}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
