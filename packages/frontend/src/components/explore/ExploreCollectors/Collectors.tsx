import Image from 'next/image';
import Link from 'next/link';
import type { User } from '@marvel-collector/types';

import { Avatar } from '@/components/ui';

type Props = {
  collectors: User[];
};

const Collectors: React.FC<Props> = ({ collectors }) => (
  <div className="grid auto-rows-auto justify-items-center gap-y-8">
    {collectors.map(({ id, firstName, lastName }) => {
      const fullName = [firstName, lastName].join(' ');

      return (
        <div
          key={id}
          className="w-96 max-w-full p-2 border border-gray-300 rounded-xl"
        >
          <div className="relative max-w-full h-40">
            <Image
              className="object-cover rounded-lg"
              // NOTE: Need to add default banner from the backend
              src="https://placebear.com/g/395/200"
              alt="Bears"
              fill
            />
            {/* NOTE: Need to add default avatar from the backend */}
            <Avatar
              className="absolute bottom-0 translate-y-1/2 translate-x-4"
              src="https://placekeanu.com/250/g"
              alt={firstName.charAt(0)}
            />
          </div>
          <div className="grid grid-cols-2 my-6 items-center">
            <div className="flex m-3">
              <p className="font-bold">{fullName}</p>
            </div>
            <Link
              className="text-base justify-self-end mr-2 hover:underline"
              href={`../collectors/${id}`}
            >
              Visit Profile
            </Link>
          </div>
        </div>
      );
    })}
  </div>
);

export default Collectors;
