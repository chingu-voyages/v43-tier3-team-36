import React from 'react';
import { Edit2, HeartHandshake } from 'lucide-react';

import { Button } from '@/components/ui';

type Props = {
  disabled: boolean;
  onEdit: () => void;
  onTrade: () => void;
};

const Actions: React.FC<Props> = ({ disabled, onEdit, onTrade }) => (
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
    <Button
      className="flex-row-reverse"
      variant="outlined"
      icon={<HeartHandshake />}
      onClick={onTrade}
    >
      Trade
    </Button>
  </div>
);

export default Actions;
