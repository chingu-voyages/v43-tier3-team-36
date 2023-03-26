import React from 'react';

export type TPActivityProps = {
  img: string;
  name: string;
  comicTitle: string;
};

export const Activity = ({ img, name, comicTitle }: TPActivityProps) => (
  <div className=" w-full rounded-lg h-12 bg-gray-200 flex m-auto center md:w-1/3">
    <img
      className="w-6 h-6 object-cover self-center m-4 rounded-full"
      src={img}
      alt="person"
    />
    <div className="self-center text-sm sm:text-base">
      <span>You</span>
      <span className="font-bold px-1 ">
        exchanged
        {comicTitle}
      </span>
      <span>
        with
        {name}
      </span>
    </div>
  </div>
);
