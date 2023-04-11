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
  comicId: any,
  userId: string,
) =>
  prisma.collectionItem.findUnique({
    where: {
      comicId_userId: {
        comicId,
        userId,
      },
    },
  });

export const deleteCollectionItem = async (comicId: number, userId: string) =>
  prisma.collectionItem.delete({
    where: {
      comicId_userId: {
        comicId,
        userId,
      },
    },
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
  email: string,
  price: number,
  message: string,
  wantedComicId: number,
) =>
  prisma.tradeOffer.create({
    data: {
      type,
      status: 'PENDING',
      createdBy: { connect: { id } },
      collection: { connect: { id: userComic.id } },
      phoneNumber,
      email,
      price,
      message,
      wantedComicId,
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

export const getTradeOffer = async (tradeOfferId: string) =>
  prisma.tradeOffer.findUnique({
    where: { id: tradeOfferId },
  });

export const deleteTradeOfferByTradeOfferId = async (tradeOfferId: string) =>
  prisma.tradeOffer.delete({
    where: { id: tradeOfferId },
  });

// user controller
export const viewUserTradeOffers = async (id: string) =>
  prisma.tradeOffer.findMany({
    where: {
      createdBy: {
        id,
      },
    },
    include: { createdBy: true, collection: true },
  });

export const viewComicBookOffers = async () =>
  prisma.tradeOffer.findMany({
    where: {
      status: 'PENDING',
    },
    include: { createdBy: true, collection: true },
  });

export const queryTradeOffers = async (location: string) =>
  prisma.tradeOffer.findMany({
    where: {
      status: 'PENDING',
      createdBy: {
        location: {
          equals: location,
          mode: 'insensitive',
        },
      },
    },
    include: { createdBy: true, collection: true },
  });

export const createTradeRequestService = async (
  receiverId: string,
  tradeOfferId: string,
  receiverComicId: number,
) =>
  prisma.tradeRequest.create({
    data: {
      receiverId,
      tradeOfferId,
      receiverComicId,
    },
  });

export const findTradeRequest = async (tradeRequestId: string) =>
  prisma.tradeRequest.findUnique({
    where: {
      id: tradeRequestId,
    },
    include: {
      TradeOffer: {
        include: {
          collection: true,
        },
      },
      receiver: true,
    },
  });

export const updateReceiverCollection = async (
  receiverItemId: string,
  creatorComic: any,
) =>
  prisma.collectionItem.update({
    where: { id: receiverItemId },
    data: {
      // comicId: TradeOffer.collection[0].comicId,
      comicId: creatorComic.comicId,
      title: creatorComic.title,
      imageUrl: creatorComic.imageUrl,
      tradeOfferId: null,
    },
  });

export const updateCreatorCollection = async (
  creatorItemId: string,
  receiverComicId: any,
  receiverComic: any,
) =>
  prisma.collectionItem.update({
    where: { id: creatorItemId },
    data: {
      comicId: receiverComicId,
      title: receiverComic.title,
      imageUrl: receiverComic.imageUrl,
    },
  });

export const updateTradeOfferStatus = async (
  tradeOfferId: string,
  status: any,
) =>
  prisma.tradeOffer.update({
    where: { id: tradeOfferId },
    data: { status },
  });

export const updateTradeRequestStatus = async (
  tradeRequestId: string,
  status: any,
) =>
  prisma.tradeRequest.update({
    where: { id: tradeRequestId },
    data: { status },
  });

export const updateByDeletingCreatorComic = async (
  tradeRequest: any,
  TradeOffer: any,
) =>
  prisma.collectionItem.update({
    where: { id: tradeRequest.TradeOffer.collection[0].id },
    data: {
      userId: tradeRequest.receiverId,
      tradeOfferId: TradeOffer.id,
    },
  });

export const storePushNotification = async (tradeOffer: any, receiver: any) =>
  prisma.pushNotification.create({
    data: {
      user: { connect: { id: tradeOffer.createdById } },
      message: `${receiver.username} requested to ${
        tradeOffer.type === 'EXCHANGE' ? 'exchange' : 'buy'
      } a comic from / with you. `.trim(),
    },
  });

export const findPushNotification = async (id: string) =>
  prisma.pushNotification.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

export const updateNotification = async (notificationId: string) =>
  await prisma.pushNotification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
