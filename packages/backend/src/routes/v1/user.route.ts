import { Router } from 'express';
import {
  UserSchema,
  UserOptionalDefaultsSchema,
  UserPartialSchema,
} from '@marvel-collector/types/generated/modelSchema';
import prisma from '../../database/PrismaClient';
import {
  register,
  logout,
  currentUser,
  login,
} from '../../controllers/user.controller';
import { RegisterSchema, LoginSchema } from '../../utils/customValidation';
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

export default router;
