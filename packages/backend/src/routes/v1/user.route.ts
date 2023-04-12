import { Router } from 'express';
import {
  UserSchema,
  UserOptionalDefaultsSchema,
} from '@marvel-collector/types/generated/modelSchema';
import prisma from '../../database/PrismaClient';
import {
  register,
  logout,
  currentUser,
  login,
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
router.get('/users/current-user', isLoggedIn, currentUser);
router.get('/user/:id', isLoggedIn, fetchUser);
router.patch(
  '/profile',
  validateSchema(updateUserSchema),
  isLoggedIn,
  updateUser,
);

export default router;
