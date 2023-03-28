/* eslint-disable max-len */
import prisma from '../database/PrismaClient';

export const findUniqueId = async (userId: string) => prisma.user.findUnique({
  where: { id: userId },
});

export const createCollectionItem = async (
  userId: string,
  comicId: number,
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
  comicId: number,
  userId: string,
) => prisma.collectionItem.findFirst({
  where: {
    comicId,
    userId,
  },
});

export const viewCollections = async (userId: string) => prisma.user.findUnique({
  where: { id: userId },
  include: { collection: true },
});

export const queryCollectors = async (username: string, location: string) => prisma.user.findMany({
  where: {
    AND: [
      { collection: { some: {} } }, // Filter for users with at least one collection item
      username
        ? { username: { contains: username, mode: 'insensitive' } }
        : {}, // Filter by username if provided
      location
        ? { location: { contains: location, mode: 'insensitive' } }
        : {}, // Filter by location if provided
    ],
  },
  include: {
    collection: true,
  },
});
