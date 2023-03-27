import { Router } from 'express';
import {
  addCollectionItemToUser,
  editByDeletingUserComic,
  queryCollectorsByUsernameAndLocation,
  viewComicBookCollectionOfUser,
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
router.delete('/user/collection/:comicId', isLoggedIn, editByDeletingUserComic);

router.get('/user/:id/collection', isLoggedIn, viewComicBookCollectionOfUser);

router.get('/collectors', isLoggedIn, queryCollectorsByUsernameAndLocation);

export default router;
