import {
  Collection,
  CollectionPartial,
  CollectionOptionalDefaultsSchema,
  CollectionOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema';
import { Prisma } from '@prisma/client';
import prisma from '../database/PrismaClient';

export const findUniqueId = async (userId: string) => prisma.user.findUnique({
  where: {
    id: userId,
  },
});

export const findUserCollection = async (userId: string) => prisma.collection.findUnique({
  where: {
    id: userId,
  },
});

export const createUserCollection = async (userId: string) => prisma.collection.create({
  data: {
    user: { connect: { id: userId } },
  },
});
export const connectCollectionItems = async (id: string) => prisma.collectionItem.findMany({
  where: {
    collectionId: id,
  },
});

export const findUserWithCollection = async (userId: string) => prisma.collection.findUnique({
  where: { userId },
  include: { collectionItems: true },
});

export const findCollectionWithUser = async (collectionId: string) => prisma.collection.findUnique({
  where: { id: collectionId },
  include: { user: true },
});

export const findExistingComic = async (
  comicId: string,
  collectionId: string,
) => prisma.collectionItem.findFirst({
  where: { comicId, collectionId },
});
