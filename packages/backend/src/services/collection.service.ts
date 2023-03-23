import { InputJsonValueType } from '@marvel-collector/types/generated/inputTypeSchemas/InputJsonValue';
import prisma from '../database/PrismaClient';

export const findUniqueIdSelectCollection = async (userId: string) => prisma.user.findUnique({
  where: {
    id: userId,
  },
  select: {
    collection: true,
  },
});

export const assignComic = async (
  userId : string,
  comic: InputJsonValueType,
) => prisma.user.update({

  where: {
    id: userId,
  },
  data: {
    collection: {
      push: comic,
    },

  },
});
