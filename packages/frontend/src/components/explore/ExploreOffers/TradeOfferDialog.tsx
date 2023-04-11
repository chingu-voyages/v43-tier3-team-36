import { useCallback } from 'react';

import { AlertDialog, Button } from '@/components/ui';

type Props = {
  type: string;
  onRequest: () => void;
  onClose: () => void;
};

const TradeOfferDialog: React.FC<Props> = ({ type, onRequest, onClose }) => {
  const RequestButton = useCallback(
    () => <Button onClick={onRequest}>Request</Button>,
    [onRequest],
  );

  const CancelButton = useCallback(
    () => (
      <Button variant="outlined" className="mr-2" onClick={onClose}>
        Cancel
      </Button>
    ),
    [onClose],
  );

  return (
    <AlertDialog
      title={`Request To ${
        type === 'EXCHANGE' ? 'Exchange' : 'Purchase'
      } Comic Book`}
      description={`Send a trade request to the seller to let them know you want to ${
        type === 'EXCHANGE' ? 'exchange' : 'buy'
      } it`}
      open
      actions={[RequestButton, CancelButton]}
      onClose={onClose}
    />
  );
};

export default TradeOfferDialog;
