import { Router } from 'express';
import { addCollectionItemToUser } from '../../controllers/collection.controller';
import { isLoggedIn, validateSchema } from '../../middleware';
import { AssignComicSchema } from '../../utils/customValidation';

const router = Router();
router.post(
  '/user/collection',
  isLoggedIn,
  validateSchema(AssignComicSchema),
  addCollectionItemToUser,
);

export default router;
