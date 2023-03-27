import { useState } from 'react';
import { Edit2 } from 'lucide-react';

import Comics from './Comics';
import { Button } from '@/components/ui';

const ProfileComics: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Comics isEdit={isEdit} />
      <Button
        className="flex-row-reverse"
        variant="outlined"
        icon={<Edit2 />}
        onClick={() => setIsEdit((prevState) => !prevState)}
      >
        Edit Mode
      </Button>
    </>
  );
};

export default ProfileComics;
