import { Request, Response } from 'express';
import {
  User,
  UserOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema/';
import { string } from 'zod';
import {
  createCollectionItem,
  existingComicInCollection,
  findUniqueId,
  queryCollectors,
  viewCollections,
} from '../services/collection.service';

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

// Endpoint for viewing comic book collections of a USER

export async function viewComicBookCollectionOfUser(
  req: Request,
  res: Response,
) {
  const { id } = req.params;

  try {
    const user = await viewCollections(id);

    // Check if user has any collections

    if (!user?.collection.length) {
      return res.status(404).json({ error: 'User has no collections' });
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
        collection: user.collection,
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
    return res.status(200).json({
      status: 'success',
      data: {
        user: collectors.map((collector) => ({
          id: collector.id,
          firstName: collector.firstName,
          lastName: collector.lastName,
          username: collector.username,
          profileImage: collector.profileImage,
          location: collector.location,
          collection: collector.collection.map((item) => ({
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
