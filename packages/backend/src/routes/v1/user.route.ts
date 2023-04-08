import { Router } from 'express';
import {
  register,
  logout,
  currentUser,
  fetchUser,
  getUsersWithComicId,
} from '../../controllers/user.controller';
import { RegisterSchema } from '../../utils/customValidation';
import {
  authPassportLocal,
  isLoggedIn,
  validateSchema,
} from '../../middleware';

const router = Router();
router.post('/register', validateSchema(RegisterSchema), register);
router.post('/login', authPassportLocal);
router.post('/logout', logout);
router.get('/users/current-user', isLoggedIn, currentUser);
router.get('/user/:id', isLoggedIn, fetchUser);
router.get('/users/comic/:comicId', getUsersWithComicId);

export default router;
