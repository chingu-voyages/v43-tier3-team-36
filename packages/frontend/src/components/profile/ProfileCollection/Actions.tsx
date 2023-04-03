import React from 'react';
import { Edit2 } from 'lucide-react';

import { Button } from '@/components/ui';

type Props = {
  onEdit: () => void;
};

const Actions: React.FC<Props> = ({ onEdit }) => (
  <div className="flex gap-x-2">
    <Button
      className="flex-row-reverse"
      variant="outlined"
      icon={<Edit2 />}
      onClick={onEdit}
    >
      Edit
    </Button>
  </div>
);

export default Actions;
