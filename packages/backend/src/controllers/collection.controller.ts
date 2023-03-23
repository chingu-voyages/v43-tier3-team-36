import { Request, Response } from 'express';
import { User, UserOptionalDefaults } from '@marvel-collector/types/generated';
import { InputJsonValueType } from '@marvel-collector/types/generated/inputTypeSchemas/InputJsonValue';
import {
  findUniqueIdSelectCollection,
  assignComic,
} from '../services/collection.service';

interface Comic {
  comicId : string;
  title: string;
  imageUrl: string
}

export const assignComicToCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const user = await findUniqueIdSelectCollection(id);
    const { comicId, title, imageUrl } = req.body;

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the comicId already exists in the collection
    const comicIds = (user.collection as unknown as Comic[]).map((c) => c.comicId);
    if (comicIds.includes(comicId)) {
      return res.status(400).json({ error: 'Comic already in collection' });
    }

    // Add comic to user's collection
    const comic: InputJsonValueType = {
      comicId, title, imageUrl,
    };
    const { collection } = await assignComic(id, comic);

    return res.status(200).json({
      message: 'Comic added to user collection',
      user: {
        collection: { comic: collection[collection.length - 1] },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};
