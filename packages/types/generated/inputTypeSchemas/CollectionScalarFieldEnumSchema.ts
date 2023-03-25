import { z } from 'zod';

export const CollectionScalarFieldEnumSchema = z.enum(['id', 'userId']);

export default CollectionScalarFieldEnumSchema;
