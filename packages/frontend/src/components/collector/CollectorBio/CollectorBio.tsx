import { useState, useMemo } from 'react';
import type { User } from '@marvel-collector/types';

import { Button } from '@/components/ui';

const DUMMY_COLLECTOR: Partial<User> = {
  profileImage:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  firstName: 'Lilly',
  lastName: 'Rose',
};

const CollectorBio = () => {
  const [collector] = useState(DUMMY_COLLECTOR);

  const fullName = useMemo(
    () => [collector.firstName, collector.lastName].join(' '),
    [collector],
  );

  const { profileImage } = collector;

  return (
    <div>
      <div className="sm:relative sm:bg-gray-200 sm:mb-10 sm:rounded-lg sm:h-52">
        <div className="flex sm:absolute sm:-bottom-10 sm:w-20 sm:left-5 sm:rounded-lg sm:mb-4 ">
          <img
            src={profileImage || ''}
            alt={fullName}
            className="m-auto rounded-full w-32 h-32 sm:w-full sm:max-h-20 object-cover sm:rounded-lg"
          />
        </div>
      </div>
      <div className=" mb-4 sm:flex sm:justify-between sm:my-8">
        <div className="mx-auto sm:m-0 text-center text-sm sm:text-left sm:text-base ">
          <h3 className="font-bold ">{fullName}</h3>
          {/* TODO: Need to add bio & location info from backend */}
        </div>
        <div className="mx-auto mt-1 mb-8 sm:mx-0 sm:my-0">
          {/* TODO: Add AlertDialog component to allow user to make decision */}
          <Button className="mx-auto sm:mx-0 py-0 sm:py-1">
            Request Trade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectorBio;
