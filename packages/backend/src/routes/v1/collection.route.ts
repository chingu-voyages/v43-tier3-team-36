/* eslint-disable import/no-cycle */
import { Router } from 'express';
import {
  addCollectionItemToUser,
  createTradeOffers,
  createTradeRequest,
  deleteTradeOffer,
  editByDeletingUserComic,
  tradeComics,
  viewComicBookCollector,
  viewTradeOffers,
  pushNotifications,
  updatePushNotifications,
  queryCollectorsByUsernameAndCountry,
} from '../../controllers/collection.controller';
import { isLoggedIn, validateSchema } from '../../middleware';
import {
  AssignComicSchema,
  TradeOfferSchema,
  TradeRequestSchema,
} from '../../utils/customValidation';

const router = Router();

router.post(
  '/collections',
  isLoggedIn,
  validateSchema(AssignComicSchema),
  addCollectionItemToUser,
);
router.delete('/collections/:comicId', isLoggedIn, editByDeletingUserComic);

router.get('/collections/:userId', isLoggedIn, viewComicBookCollector);

router.get('/collectors', isLoggedIn, queryCollectorsByUsernameAndCountry);

router.post(
  '/trade-offers',
  isLoggedIn,
  validateSchema(TradeOfferSchema),
  createTradeOffers,
);

router.delete('/trade-offers/:tradeOfferId', isLoggedIn, deleteTradeOffer);

router.get('/trade-offers', viewTradeOffers);

router.post(
  '/trade-requests',
  validateSchema(TradeRequestSchema),
  isLoggedIn,
  createTradeRequest,
);

router.patch('/trades/:tradeRequestId', isLoggedIn, tradeComics);

router.get('/notifications', isLoggedIn, pushNotifications);

router.patch(
  '/notifications/:notificationId',
  isLoggedIn,
  updatePushNotifications,
);

export default router;
