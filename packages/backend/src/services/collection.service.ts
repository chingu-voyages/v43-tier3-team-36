/* eslint-disable max-len */
import prisma from '../database/PrismaClient';

export const findUniqueId = async (userId: string) => prisma.user.findUnique({
  where: { id: userId },
});

export const createCollectionItem = async (
  userId: string,
  comicId: string,
  title: string,
  imageUrl: string,
) => prisma.collectionItem.create({
  data: {
    comicId,
    title,
    imageUrl,
    User: {
      connect: { id: userId },
    },
  },
});

export const existingComicInCollection = async (
  comicId: string,
  userId: string,
) => prisma.collectionItem.findFirst({
  where: {
    comicId,
    userId,
  },
});
