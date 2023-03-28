import { Router } from 'express';
import {
  addCollectionItemToUser,
  queryCollectorsByUsernameAndLocation,
  viewComicBookCollector,
} from '../../controllers/collection.controller';
import { isLoggedIn, validateSchema } from '../../middleware';
import { AssignComicSchema } from '../../utils/customValidation';

const router = Router();
router.post(
  '/user/collection',
  isLoggedIn,
  validateSchema(AssignComicSchema),
  addCollectionItemToUser,
);

router.get('/collectors', isLoggedIn, queryCollectorsByUsernameAndLocation);
router.get('/collectors/:id', isLoggedIn, viewComicBookCollector);

export default router;
