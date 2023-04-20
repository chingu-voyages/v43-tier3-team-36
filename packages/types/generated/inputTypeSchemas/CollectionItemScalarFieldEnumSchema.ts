import { z } from 'zod';

export const CollectionItemScalarFieldEnumSchema = z.enum([
  'id',
  'comicId',
  'title',
  'imageUrl',
  'issueNumber',
  'userId',
  'tradeOfferId',
]);

export default CollectionItemScalarFieldEnumSchema;
