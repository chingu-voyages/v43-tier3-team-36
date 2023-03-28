import type { User } from '@marvel-collector/types';

import { Button } from '@/components/ui';

const PROFILE_BANNER_FALLBACK = 'https://placebear.com/g/1290/300';
const PROFILE_IMAGE_FALLBACK = 'https://placekeanu.com/250/g';

type Props = {
  info: Pick<User, 'firstName' | 'lastName' | 'profileImage'>;
};

const UserBio: React.FC<Props> = ({ info }) => {
  const { firstName, lastName, profileImage } = info;

  const fullName = [firstName, lastName].join(' ');

  return (
    <div>
      <div className="sm:relative sm:mb-10 sm:h-52 max-w-full">
        <img
          className="absolute w-full h-52 sm:rounded-lg hidden sm:block"
          src={PROFILE_BANNER_FALLBACK}
          alt="Profile banner"
        />
        <div className="flex sm:absolute sm:-bottom-10 sm:w-20 sm:left-5 sm:rounded-lg sm:mb-4 ">
          <img
            src={profileImage || PROFILE_IMAGE_FALLBACK}
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

export default UserBio;
