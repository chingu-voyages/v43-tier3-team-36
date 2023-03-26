import { Router } from 'express';
import user from './user.route';
import collection from './collection.route';

const router = Router();

router.use(user);
router.use(collection);

export default router;
