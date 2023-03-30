/* eslint-disable */
import prisma from '../database/PrismaClient';

export const findUniqueId = async (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
  });

export const createCollectionItem = async (
  userId: string,
  comicId: number,
  title: string,
  imageUrl: string,
) =>
  prisma.collectionItem.create({
    data: {
      comicId,
      title,
      imageUrl,
      user: {
        connect: { id: userId },
      },
    },
  });

export const existingComicInCollection = async (
  comicId: number,
  userId: string,
) =>
  prisma.collectionItem.findFirst({
    where: {
      comicId,
      userId,
    },
  });

export const viewCollections = async (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
    include: { collection: true },
  });

export const queryCollectors = async (username: string, location: string) =>
  prisma.user.findMany({
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

export const findCollectionItemByComicId = async (
  comicId: number,
  userId: string,
) =>
  prisma.collectionItem.findUnique({
    where: { comicId },
    select: { userId: true },
  });

export const deleteCollectionItem = async (comicId: number) =>
  prisma.collectionItem.delete({
    where: { comicId },
  });

export const getUserComic = async (userId: string, comicId: number) =>
  prisma.collectionItem.findFirst({
    where: {
      userId,
      comicId,
    },
  });

export const createOffer = async (
  type: any,
  id: string,
  userComic: any,
  phoneNumber: string,
  price: number,
  message: string,
) =>
  prisma.tradeOffer.create({
    data: {
      type,
      status: 'PENDING',
      createdBy: { connect: { id } },
      collection: { connect: { comicId: userComic.comicId } },
      phoneNumber,
      price,
      message,
    },
    include: { createdBy: true, collection: true },
  });

export const checkTradedOffer = async (id: string, userComic: any) =>
  prisma.tradeOffer.findFirst({
    where: {
      createdBy: { id },
      AND: {
        collection: { some: { comicId: userComic.comicId } },
        status: { not: 'DECLINED' },
      },
    },
  });

export const getTradeOfferByTradeOfferId = async (id: string, userId: string) =>
  prisma.tradeOffer.findFirst({
    where: { id, createdBy: { id: userId } },
  });

export const deleteTradeOfferByTradeOfferId = async (tradeOfferId: string) =>
  prisma.tradeOffer.delete({
    where: { id: tradeOfferId },
  });
