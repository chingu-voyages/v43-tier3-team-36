import { z } from 'zod';

export const CollectionItemScalarFieldEnumSchema = z.enum([
  'id',
  'comicId',
  'title',
  'imageUrl',
  'userId',
  'tradeOfferId',
]);

export default CollectionItemScalarFieldEnumSchema;
