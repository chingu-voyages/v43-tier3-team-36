import { Request, Response } from 'express';
import {
  User,
  UserOptionalDefaults,
  Collection,
  CollectionPartial,
  CollectionOptionalDefaultsSchema,
  CollectionOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema';
import { strict } from 'assert';
import {
  findUniqueId,
  findUserCollection,
  createUserCollection,
  connectCollectionItems,
  findUserWithCollection,
  findCollectionWithUser,
  findExistingComic,
} from '../services/collection.service';
import prisma from '../database/PrismaClient';

// This function is for creating a user's collection

// export async function createCollection(req: Request, res: Response) {
//   const { id } = req.user as User;
//   console.log(id, 'first id');
//   try {
//     const user = await findUniqueId(id);
//     console.log(user, id);

//     // Check whether user exists
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const existingCollection = await findUserCollection(id);

//     if (existingCollection !== null) {
//       return res
//         .status(400)
//         .json({ error: 'Collection already exists for this user' });
//     }

//     const collection = await createUserCollection(id);

//     return res.status(200).json({
//       status: 'success',
//       message: 'user collection successfully created',
//       data: {
//         id: collection.id,
//         userId: collection.userId,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal server error/ Collection already exists for this user',
//     });
//   }
// }

// This endpoint is for assigning comics to a User's collection

export async function assignCollectionItems(req: Request, res: Response) {
  const { id } = req.user as User;
  const { collectionId } = req.params;
  const { comicId, title, imageUrl } = req.body;

  try {
    const collection = await findCollectionWithUser(collectionId);

    // Check that the collection exists and belongs to the authenticated user
    if (!collection || collection.user.id !== id) {
      return res.status(404).json({
        error:
          'Collection not found, check collectionId or create a collection',
      });
    }

    const existingItem = await findExistingComic(comicId, collectionId);

    if (existingItem) {
      return res
        .status(400)
        .json({ error: 'Comic already exist in user collection' });
    }

    // New collection item

    const newCollectionItem = {
      comicId,
      title,
      imageUrl,
      collectionId,
    };

    console.log(newCollectionItem, 'new collection item');

    // Add the new collection items to the database
    const createdItem = await prisma.collectionItem.create({
      data: newCollectionItem,
    });

    return res.status(201).json({ Comic: createdItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
