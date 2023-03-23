import { Router } from 'express';
import {
  assignComicToCollection,
} from '../../controllers/collection.controller';
import {
  isLoggedIn,
} from '../../middleware';

const router = Router();
router.post('/user/collection', isLoggedIn, assignComicToCollection);

export default router;
