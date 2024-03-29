import { Router } from 'express';
import {
  register,
  logout,
  currentUser,
  fetchUser,
  updateUser,
} from '../../controllers/user.controller';
import {
  RegisterSchema,
  LoginSchema,
  updateUserSchema,
} from '../../utils/customValidation';
import {
  authPassportLocal,
  isLoggedIn,
  validateSchema,
} from '../../middleware';

const router = Router();
router.post('/register', validateSchema(RegisterSchema), register);
router.post('/login', authPassportLocal);
router.post('/logout', logout);
router.get('/current-user', isLoggedIn, currentUser);
router.get('/users/:id', isLoggedIn, fetchUser);
router.patch(
  '/profile',
  validateSchema(updateUserSchema),
  isLoggedIn,
  updateUser,
);

export default router;
