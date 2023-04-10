import { Edit2, HeartHandshake } from 'lucide-react';

import { Button } from '@/components/ui';

type Props = {
  onEdit: () => void;
  onTrade: () => void;
};

const CollectionActions: React.FC<Props> = ({ onEdit, onTrade }) => (
  <div className="flex justify-center gap-x-2 lg:order-1">
    <Button
      className="flex-row-reverse"
      variant="outlined"
      icon={<Edit2 />}
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

export default CollectionActions;
