import { useState } from 'react';
import Actions from './Actions';

import Comics from './Comics';

const ProfileComics: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  return (
    <section>
      <h2 className="font-bold">Your Collection</h2>
      <Comics isEdit={isEdit} />
      <Actions onEdit={toggleEditHandler} />
    </section>
  );
};

export default ProfileComics;
