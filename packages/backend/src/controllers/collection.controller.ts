import { Request, Response } from 'express';
import { string } from 'zod';
import {
  User,
  UserOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema/UserSchema';
import {
  checkTradedOffer,
  createCollectionItem,
  createOffer,
  deleteCollectionItem,
  deleteTradeOfferByTradeOfferId,
  existingComicInCollection,
  findCollectionItemByComicId,
  findUniqueId,
  getTradeOfferByTradeOfferId,
  getUserComic,
  queryCollectors,
  viewCollections,
} from '../services/collection.service';
import prisma from '../database/PrismaClient';

// Assigning Comics to a User collection

export async function addCollectionItemToUser(req: Request, res: Response) {
  const { id } = req.user as User;
  const { comicId, title, imageUrl } = req.body;

  try {
    // Check if the user exists
    const user = await findUniqueId(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if comicId already exists in User's collection

    const existingCollectionItem = await existingComicInCollection(comicId, id);
    if (existingCollectionItem) {
      return res.status(400).json({
        error: `Comic with id ${comicId} already exists in User's collection`,
      });
    }

    // Create a new collection item
    const collection = await createCollectionItem(id, comicId, title, imageUrl);

    return res.status(200).json({
      message: 'Collection item added to user collection successfully',
      collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Endpoint for viewing comic book collector

export async function viewComicBookCollector(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await viewCollections(id);

    // Check if user has any collections

    if (!user?.collection.length) {
      return res
        .status(404)
        .json({ error: 'User not found / User has no collections' });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImage: user.profileImage,
        location: user.location,
        collection: user.collection.map((item: any) => ({
          id: item.id,
          comicId: item.comicId,
          title: item.title,
          imageUrl: item.imageUrl,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function queryCollectorsByUsernameAndLocation(
  req: Request,
  res: Response,
) {
  const { username, location } = req.query as Record<string, string>;

  try {
    const collectors = await queryCollectors(username, location);
    if (!collectors.length) {
      return res
        .status(404)
        .json({ error: `No user by ${username} and/or ${location} exists` });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        user: collectors.map((collector: any) => ({
          id: collector.id,
          firstName: collector.firstName,
          lastName: collector.lastName,
          username: collector.username,
          profileImage: collector.profileImage,
          location: collector.location,
          collection: collector.collection.map((item: any) => ({
            id: item.id,
            comicId: item.comicId,
            title: item.title,
            imageUrl: item.imageUrl,
          })),
        })),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Edit by deleting comic in a user's collection

export async function editByDeletingUserComic(req: Request, res: Response) {
  const { comicId } = req.params;
  const { id } = req.user as User;

  try {
    const collectionItem = await findCollectionItemByComicId(
      Number(comicId),
      id,
    );

    // Checking if collecion item exists

    if (!collectionItem) {
      return res.status(404).json({ error: 'Collection item not found' });
    }

    if (collectionItem.userId !== id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const deletedItem = await deleteCollectionItem(Number(comicId));

    return res.status(200).json({
      status: 'success',
      data: { message: 'Comic has been successfully deleted' },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Creating trade offers

export async function createTradeOffers(req: Request, res: Response) {
  const {
    type, comicId, phoneNumber, price, message,
  } = req.body;
  const { id } = req.user as User;

  try {
    // Get the user's comics
    const userComic = await getUserComic(id, comicId);

    // Make sure the requested comic belongs to the user
    if (!userComic) {
      return res
        .status(400)
        .send({ error: "The requested comic doesn't belong to the user" });
    }

    // Check if the user has already created a trade offer with the same comic
    const existingTradeOffer = await checkTradedOffer(id, userComic);

    if (existingTradeOffer) {
      return res
        .status(400)
        .send({ error: 'The comic has already been put up for trade' });
    }

    // Create the trade offer
    const tradeOffer = await createOffer(
      type,
      id,
      userComic,
      phoneNumber,
      price,
      message,
    );
    return res.status(201).json({
      status: 'Success',
      data: {
        tradeOfferId: tradeOffer.id,
        type: tradeOffer.type,
        status: tradeOffer.status,
        message: tradeOffer.message,
        createdAt: tradeOffer.createdAt,
        createdBy: {
          userId: tradeOffer.createdBy.id,
          firstName: tradeOffer.createdBy.firstName,
          lastName: tradeOffer.createdBy.lastName,
          username: tradeOffer.createdBy.username,
          profileImage: tradeOffer.createdBy.profileImage,
          location: tradeOffer.createdBy.location,
        },
        contactDetails: {
          email: tradeOffer.createdBy.email,
          phoneNumber: tradeOffer.phoneNumber,
        },
        tradeOffer: tradeOffer.collection.map((item: any) => ({
          collectionId: item.id,
          comicId: item.comicId,
          title: item.title,
          imageUrl: item.imageUrl,
          tradeOfferId: item.tradeOfferId,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Deleting a trade offer

export async function deleteTradeOffer(req: Request, res: Response) {
  const { tradeOfferId } = req.params;
  const { id } = req.user as User;

  console.log(tradeOfferId);

  try {
    // Get a tradeOffer by tradeOfferId

    const tradeOffer = await getTradeOfferByTradeOfferId(tradeOfferId, id);

    // Make sure the trade offer exists
    if (!tradeOffer) {
      return res.status(404).send({ error: 'Trade offer not found' });
    }

    // Delete the trade offer
    await deleteTradeOfferByTradeOfferId(tradeOfferId);
    return res.status(200).json({
      status: 'success',
      data: {
        message: `Trade Offer with id ${tradeOfferId} successfully deleted`,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
