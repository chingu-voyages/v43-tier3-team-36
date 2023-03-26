import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

export type TPComicProps = {
  img: string;
  title: string;
  description: string;
};

export const Comic = ({ img, title, description }: TPComicProps) => (
  <article className="min-w-full border-2 rounded-md px-4 border-gray-200 pt-4 sm:min-w-0 sm:max-w-[18rem] lg:min-w-[21rem]">
    <img
      className="w-full max-h-[15rem] object-fill rounded-md mb-2"
      src={img}
      alt="card"
    />
    <div className="flex justify-between py-4">
      <div>
        <h4>{title}</h4>
        <p className="text-sm">
          {description}
          {' '}
        </p>
        <div className="mt-3">
          <button
            type="button"
            className="bg-red-400 rounded-full text-xs text-center p-1 mr-4"
          >
            Issues #2
          </button>
          <button
            type="button"
            className="bg-green-400 rounded-full text-xs text-center p-1 ml-4"
          >
            Action
          </button>
        </div>
      </div>
      <FiMoreHorizontal cursor="pointer" fontSize="1.5rem" />
    </div>
  </article>
);
