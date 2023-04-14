/* eslint-disable import/no-cycle */
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
  createTradeRequestService,
  deleteCollectionItem,
  deleteTradeOfferByTradeOfferId,
  existingComicInCollection,
  findCollectionItemByComicId,
  findPushNotification,
  findTradeRequest,
  findUniqueId,
  getTradeOffer,
  getTradeOfferByTradeOfferId,
  getUserComic,
  queryCollectors,
  queryTradeOffers,
  storePushNotification,
  updateByDeletingCreatorComic,
  updateCreatorCollection,
  updateNotification,
  updateReceiverCollection,
  updateTradeOfferStatus,
  updateTradeRequestStatus,
  viewCollections,
  viewComicBookOffers,
} from '../services/collection.service';
import { pusher } from '../app';

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
  const { userId } = req.params;

  try {
    const user = await viewCollections(userId);

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

    await deleteCollectionItem(Number(comicId), id);

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
    type, comicId, phoneNumber, email, price, message, wantedComicId,
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
      email,
      price,
      message,
      wantedComicId,
    );
    return res.status(201).json({
      status: 'Success',
      data: {
        tradeOfferId: tradeOffer.id,
        type: tradeOffer.type,
        status: tradeOffer.status,
        message: tradeOffer.message,
        price: tradeOffer.price,
        wantedComicId: tradeOffer.wantedComicId,
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
          email: tradeOffer.email,
          phoneNumber: tradeOffer.phoneNumber,
        },
        tradeOffer: {
          collectionId: tradeOffer.collection[0].id,
          comicId: tradeOffer.collection[0].comicId,
          title: tradeOffer.collection[0].title,
          imageUrl: tradeOffer.collection[0].imageUrl,
          tradeOfferId: tradeOffer.collection[0].tradeOfferId,
        },
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

// View Comic Book Offers

export async function viewTradeOffers(req: Request, res: Response) {
  const { location } = req.query as Record<string, string>;
  try {
    let tradeOffers;

    if (location) {
      tradeOffers = await queryTradeOffers(location);
    } else {
      tradeOffers = await viewComicBookOffers();
    }

    if (!tradeOffers.length) {
      return res
        .status(404)
        .json({ error: 'There are currently no trade offers' });
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        tradeOffers: tradeOffers.map((tradeOffer: any) => ({
          tradeOfferId: tradeOffer.id,
          type: tradeOffer.type,
          status: tradeOffer.status,
          message: tradeOffer.message,
          price: tradeOffer.price,
          wantedComicId: tradeOffer.wantedComicId,
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
            email: tradeOffer.email,
            phoneNumber: tradeOffer.phoneNumber,
          },
          tradeOffer: {
            collectionId: tradeOffer.collection[0].id,
            comicId: tradeOffer.collection[0].comicId,
            title: tradeOffer.collection[0].title,
            imageUrl: tradeOffer.collection[0].imageUrl,
            tradeOfferId: tradeOffer.collection[0].tradeOfferId,
          },
        })),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching trade offers');
  }
}

export async function createTradeRequest(req: Request, res: Response) {
  const { id } = req.user as User;
  const { tradeOfferId, receiverComicId } = req.body;

  try {
    const receiver = await findUniqueId(id);

    if (!receiver) {
      return res.status(400).send({ message: 'User/Receiver not found' });
    }

    const tradeOffer = await getTradeOffer(tradeOfferId);
    if (!tradeOffer) {
      return res.status(400).send({ message: 'Trade offer not found' });
    }

    if (tradeOffer.type === 'EXCHANGE') {
      const comicId = tradeOffer?.wantedComicId;
      const collectionItem = await findCollectionItemByComicId(comicId, id);

      // Checking if collecion item exists

      if (!collectionItem) {
        return res.status(404).send({
          message: `Receiver does not have comic ${tradeOffer.wantedComicId}`,
        });
      }
    }

    const tradeRequest = await createTradeRequestService(
      id,
      tradeOfferId,
      receiverComicId,
    );

    // send notification to trade offer owner using Pusher
    pusher.trigger(tradeOffer.createdById, 'trade-request', {
      message: `
      ${receiver.username} requested to ${
  tradeOffer.type === 'EXCHANGE' ? 'exchange' : 'buy'
} a comic from / with you. `.trim(),
    });

    // store pusher notification in the database
    await storePushNotification(tradeOffer, receiver);

    return res.status(201).json({
      status: 'success',
      data: {
        tradeRequest,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating trade requests');
  }
}

// EXCHANGE/SELL COMICS

export async function tradeComics(req: Request, res: Response) {
  const { id } = req.user as User;
  const { tradeRequestId } = req.params;
  const { status } = req.body;

  const tradeRequest = await findTradeRequest(tradeRequestId);

  if (!tradeRequest) {
    return res.status(404).json({ error: 'Trade request not found' });
  }

  if (status === 'ACCEPTED') {
    const { TradeOffer, receiverComicId, receiverId } = tradeRequest;
    const { createdById, collection } = TradeOffer;
    const creatorId = createdById;

    if (creatorId !== id) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to perform this action' });
    }

    if (TradeOffer.type === 'EXCHANGE') {
      const receiverComic = await findCollectionItemByComicId(
        receiverComicId,
        receiverId,
      );

      const creatorComic = collection.find(
        (comic: any) => comic.comicId === TradeOffer.collection[0].comicId,
      );

      if (!receiverComic || !creatorComic) {
        return res.status(404).json({ error: 'Comic not found' });
      }

      const { id: receiverItemId } = receiverComic;
      const { id: creatorItemId } = creatorComic;

      await updateReceiverCollection(receiverItemId, creatorComic);

      await updateCreatorCollection(
        creatorItemId,
        receiverComicId,
        receiverComic,
      );

      await updateTradeOfferStatus(TradeOffer.id, status);

      await updateTradeRequestStatus(tradeRequestId, status);

      return res.status(200).json({ message: 'Exchange successful' });
    }

    const creatorComic = collection.find(
      (comic: any) => comic.comicId === TradeOffer.collection[0].comicId,
    );

    if (!creatorComic) {
      return res.status(404).json({ error: 'Comic not found' });
    }

    await updateByDeletingCreatorComic(tradeRequest, TradeOffer);

    await updateTradeOfferStatus(TradeOffer.id, status);

    await updateTradeRequestStatus(tradeRequestId, status);

    return res
      .status(200)
      .json({ message: 'Comic has been successfully purchased' });
  }
  if (status === 'DECLINED') {
    await updateTradeRequestStatus(tradeRequestId, status);
    return res.status(400).json({ message: 'Trade request declined' });
  }
  await updateTradeRequestStatus(tradeRequestId, status);
  return res.status(400).json({ message: 'Invalid status' });
}

// Fetch notifications

export async function pushNotifications(req: Request, res: Response) {
  const { id } = req.user as User;

  try {
    const notification = await findPushNotification(id);

    return res.status(200).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).send('User has no notification');
  }
}

// update notification status endpoint

export async function updatePushNotifications(req: Request, res: Response) {
  try {
    const { notificationId } = req.params;
    const notification = await updateNotification(notificationId);

    res.status(200).json({
      status: 'success',
      data: {
        notification,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating notification status.' });
  }
}
