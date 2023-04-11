/* eslint-disable import/no-cycle */
import { Router } from 'express';
import {
  addCollectionItemToUser,
  createTradeOffers,
  createTradeRequest,
  deleteTradeOffer,
  editByDeletingUserComic,
  tradeComics,
  queryCollectorsByUsernameAndLocation,
  viewComicBookCollector,
  viewTradeOffers,
  pushNotifications,
  updatePushNotifications,
} from '../../controllers/collection.controller';
import { isLoggedIn, validateSchema } from '../../middleware';
import {
  AssignComicSchema,
  TradeOfferSchema,
  TradeRequestSchema,
} from '../../utils/customValidation';

const router = Router();

router.post(
  '/user/collection',
  isLoggedIn,
  validateSchema(AssignComicSchema),
  addCollectionItemToUser,
);
router.delete('/user/collection/:comicId', isLoggedIn, editByDeletingUserComic);

router.get('/user/:id/collection', isLoggedIn, viewComicBookCollector);

router.get('/collectors', isLoggedIn, queryCollectorsByUsernameAndLocation);

router.post(
  '/user/trade-offer',
  isLoggedIn,
  validateSchema(TradeOfferSchema),
  createTradeOffers,
);

router.delete('/user/trade-offer/:tradeOfferId', isLoggedIn, deleteTradeOffer);

router.get('/trade-offers', viewTradeOffers);

router.post(
  '/trade-offer-request',
  validateSchema(TradeRequestSchema),
  isLoggedIn,
  createTradeRequest,
);

router.patch('/trade/:tradeRequestId', isLoggedIn, tradeComics);

router.get('/notifications', isLoggedIn, pushNotifications);

router.patch(
  '/notifications/:notificationId',
  isLoggedIn,
  updatePushNotifications,
);

export default router;
