import { Request, Response } from 'express';
import {
  User,
  UserOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema/';
import {
  createCollectionItem,
  existingComicInCollection,
  findUniqueId,
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
      return res
        .status(400)
        .json({
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
