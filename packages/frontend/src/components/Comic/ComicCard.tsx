import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/Button';

export type TComicCardProps = {
  title: string;
  issue: number;
  imageUrl?: string;
  withBorder?: boolean;
  large?: boolean;
  onAction?: () => void;
};

export const ComicCard = ({
  title,
  issue,
  imageUrl,
  withBorder,
  large,
  onAction,
}: TComicCardProps) => {
  const handleAction = () => {
    onAction?.();
  };
  return (
    <div
      className={`w-${large ? '84' : '60'} p-2 bg-white ${
        withBorder ? 'border' : ''
      } border-gray-200 rounded-lg`}
    >
      <Image
        src={
          imageUrl
          || 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5876fe74-9e55-493f-a3e0-e95076ef3962/dfld4s6-678156d5-357d-4f01-83c8-39c555889984.jpg/v1/fill/w_1024,h_742,q_75,strp/comic_placeholder_1_by_oceanside7_dfld4s6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQyIiwicGF0aCI6IlwvZlwvNTg3NmZlNzQtOWU1NS00OTNmLWEzZTAtZTk1MDc2ZWYzOTYyXC9kZmxkNHM2LTY3ODE1NmQ1LTM1N2QtNGYwMS04M2M4LTM5YzU1NTg4OTk4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.0wYHMk-cn4o0BLbDEDyebHIAr7lj265-7yHRRcbmSGQ'
        }
        alt="comic-image"
        width={600}
        height={600}
        className="rounded-lg rounded-b-none"
      />

      <div className="pt-2 flex justify-between items-end">
        <div>
          <h6 className="font-bold tracking-tight text-black-900">{title}</h6>
          <p className="text-sm mb-3 font-semibold text-black-900">
            Issue:
            {issue}
          </p>
        </div>
        {onAction && (
          <Button onClick={handleAction} variant="outlined">
            Add
          </Button>
        )}
      </div>
    </div>
  );
};
