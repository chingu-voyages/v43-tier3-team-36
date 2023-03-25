import { z } from 'zod';

export const CollectionItemScalarFieldEnumSchema = z.enum([
  'id',
  'comicId',
  'title',
  'imageUrl',
  'collectionId',
]);

export default CollectionItemScalarFieldEnumSchema;
