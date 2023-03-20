import { Router } from 'express';
import { UserSchema } from '@marvel-collector/types/';
import prisma from '../../database/PrismaClient';

const router = Router();

router.get('/user', async (req, res) => {
  // this should be a global call

  const user = await prisma.user.findFirst({
    where: {
      username: '@Fouad',
    },
  });

  if (UserSchema.parse(user)) return res.send(user);

  return res.send('User not found');
});

export default router;
