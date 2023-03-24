import { Request, Response } from 'express';
import {
  User,
  UserOptionalDefaults,
  Collection,
  CollectionPartial,
  CollectionOptionalDefaultsSchema,
  CollectionOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema';
import {
  findUniqueId,
  assignComic,
  findUniqueComicId,
} from '../services/collection.service';

interface Comic {
  comicId: string;
  title: string;
  imageUrl: string;
}

export const assignComicToCollection = async (
  req: Request<{}, {}, Collection>,
  res: Response,
) => {
  try {
    const { id } = req.user as User;
    const user = findUniqueId(id);
    const { comicId, title, imageUrl } = req.body;

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if comicId already exist in collection

    const existingCollection = await findUniqueComicId(comicId);
    if (existingCollection) {
      return res
        .status(409)
        .json({ message: 'Comic already exist in collection' });
    }

    // Add comic to user's collection
    const collection = await assignComic(id, comicId, title, imageUrl);

    return res.status(200).json({
      message: 'Comic added to user collection',
      user: {
        collection,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};
