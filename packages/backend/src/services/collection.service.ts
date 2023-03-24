import {
  Collection,
  CollectionPartial,
  CollectionOptionalDefaultsSchema,
  CollectionOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema/';
import prisma from '../database/PrismaClient';

export const findUniqueId = async (userId: string) => prisma.user.findUnique({
  where: {
    id: userId,
  },
});

export const findUniqueComicId = async (comicId: string) => prisma.collection.findUnique({
  where: {
    comicId,
  },
});

export const assignComic = async (
  userId: string,
  comicId: string,
  title: string,
  imageUrl: string,
) => prisma.collection.create({
  data: {
    comicId,
    title,
    imageUrl,
    user: { connect: { id: userId } },
  },
});
