import React from 'react';
import { Button } from '@/components/ui';

export type TPDetailsProps = {
  img: string;
  name: string;
  description: string;
  location: string;
};

export const ProfileDetails = ({
  img,
  name,
  description,
  location,
}: TPDetailsProps) => (
  <div>
    <div className="sm:relative sm:bg-gray-200 sm:mb-10 sm:rounded-lg sm:h-52">
      <div className="flex sm:absolute sm:-bottom-10 sm:w-20 sm:left-5 sm:rounded-lg sm:mb-4 ">
        <img
          src={img}
          alt="her"
          className="m-auto rounded-full w-32 h-32 sm:w-full sm:max-h-20 object-cover sm:rounded-lg  "
        />
      </div>
    </div>
    <div className=" mb-4 sm:flex sm:justify-between sm:my-8">
      <div className="mx-auto sm:m-0 text-center text-sm sm:text-left sm:text-base ">
        <h3 className="font-bold ">{name}</h3>
        <h3 className="font-bold">{description}</h3>
        <p>{location}</p>
      </div>
      <div className="mx-auto mt-1 mb-8 sm:mx-0 sm:my-0">
        <Button className="mx-auto sm:mx-0 py-0 sm:py-1">
          Request Trade
        </Button>
      </div>
    </div>
  </div>
);
