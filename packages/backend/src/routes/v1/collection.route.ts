import { CollectionSchema } from '@marvel-collector/types/generated';
import { Router } from 'express';
import {
  assignCollectionItems,
  // createCollection,
} from '../../controllers/collection.controller';
import { isLoggedIn, validateSchema } from '../../middleware';
import { AssignComicSchema } from '../../utils/customValidation';

const router = Router();
// router.post('/user/collection', isLoggedIn, createCollection);
router.post(
  '/user/collection/:collectionId/comic',
  isLoggedIn,
  validateSchema(AssignComicSchema),
  assignCollectionItems,
);

export default router;
