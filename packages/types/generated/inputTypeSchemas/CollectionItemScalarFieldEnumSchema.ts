import { z } from 'zod';

export const CollectionItemScalarFieldEnumSchema = z.enum(['id','comicId','title','imageUrl','userId']);

export default CollectionItemScalarFieldEnumSchema;
