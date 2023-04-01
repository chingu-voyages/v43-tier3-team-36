import React from 'react';
import { Edit2 } from 'lucide-react';

import { Button } from '@/components/ui';

type Props = {
  onEdit: () => void;
  disabled: boolean;
};

const Actions: React.FC<Props> = ({ onEdit, disabled }) => (
  <div className="flex gap-x-2">
    <Button
      className="flex-row-reverse"
      variant="outlined"
      icon={<Edit2 />}
      disabled={disabled}
      onClick={onEdit}
    >
      Edit
    </Button>
  </div>
);

export default Actions;
