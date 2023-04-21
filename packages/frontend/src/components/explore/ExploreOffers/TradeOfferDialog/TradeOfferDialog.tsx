import { useMutation } from '@tanstack/react-query';

import { Modal, Button } from '@/components/ui';
import ExchangeComics from './ExchangeComics';
import { requestTradeOffer } from '@/api';
import { DELAY_CLOSE_MS } from '@/data/constants';
import useAlertStore from '@/store/store';

type Props = {
  offer: any;
  onClose: () => void;
};

const TradeOfferDialog: React.FC<Props> = ({ offer, onClose }) => {
  const { type, wantedComicId } = offer;
  const setAlert = useAlertStore((state) => state.setAlert);
  const requestTradeMutation = useMutation({
    mutationFn: requestTradeOffer,
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

  const requestHandler = (comicId: number) => {
    requestTradeMutation.mutate({
      tradeOfferId: offer.tradeOfferId,
      receiverComicId: comicId,
    });
  };

  const isExchange = type === 'EXCHANGE';

  return (
    <Modal
      className="relative sm:max-w-2xl"
      title={`Request To ${isExchange ? 'Exchange' : 'Purchase'} Comic Book`}
      description={`Send a trade request to the seller to let them know you want to ${
        isExchange ? 'exchange' : 'buy'
      } it`}
      open
    >
      {isExchange ? (
        <ExchangeComics
          wantedComicId={wantedComicId}
          offer={offer}
          onRequest={requestHandler}
        />
      ) : (
        <Button
          className="mx-auto mt-5 mb-5"
          onClick={() => requestTradeMutation.mutate({
            tradeOfferId: offer.tradeOfferId,
          })}
        >
          Request
        </Button>
      )}
    </Modal>
  );
};

export default TradeOfferDialog;
