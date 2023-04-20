import { useMutation } from '@tanstack/react-query';

import { Modal, Button } from '@/components/ui';
import useAlertStore from '@/store/store';
import { respondTradeOffer } from '@/api';
import { DELAY_CLOSE_MS } from '@/data/constants';

type Props = {
  offer: any;
  onClose: () => void;
};

const RespondTradeModal: React.FC<Props> = ({ offer, onClose }) => {
  const { status, type, tradeOfferId } = offer;
  const setAlert = useAlertStore((state) => state.setAlert);
  const respondTradeMutation = useMutation({
    mutationFn: respondTradeOffer,
    onSuccess: (message) => {
      setAlert({ type: 'success', message });
      setTimeout(() => onClose(), DELAY_CLOSE_MS);
    },
    onError: (err) => {
      setAlert({
        type: 'error',
        message: err as string,
      });
    },
  });

  const isExchange = type === 'EXCHANGE';
  const isPending = status === 'PENDING';

  return (
    <Modal
      className="relative sm:max-w-2xl"
      title="Respond to a trade request offer"
      description={`Respond to them to let them know whether you want to ${
        isExchange ? 'exchange' : 'sell'
      } your comic to them or not`}
      open
    >
      {!isPending ? (
        <div className="p-16">
          <p className="text-center">
            Still looking for a collector to make trade with you
          </p>
        </div>
      ) : (
        <>
          <div className="m-5">
            <p>
              If someone has contacted you about this trade, then please respond
              to their trade request with either of the options below
            </p>
          </div>
          <div className="flex justify-center mt-5">
            <Button
              className="mx-auto mt-5 mb-5"
              onClick={() => respondTradeMutation.mutate({
                tradeRequestId: tradeOfferId,
                status: 'ACCEPTED',
              })}
            >
              Accept
            </Button>
            <Button
              className="mx-auto mt-5 mb-5"
              onClick={() => respondTradeMutation.mutate({
                tradeRequestId: tradeOfferId,
                status: 'DECLINED',
              })}
            >
              Decline
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default RespondTradeModal;
