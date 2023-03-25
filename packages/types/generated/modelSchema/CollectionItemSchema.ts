import { z } from 'zod';

/////////////////////////////////////////
// COLLECTION ITEM SCHEMA
/////////////////////////////////////////

export const CollectionItemSchema = z.object({
  id: z.string().uuid(),
  comicId: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  userId: z.string().nullable(),
});

export type CollectionItem = z.infer<typeof CollectionItemSchema>;

// COLLECTION ITEM PARTIAL SCHEMA
//------------------------------------------------------

export const CollectionItemPartialSchema = CollectionItemSchema.partial();

export type CollectionItemPartial = z.infer<typeof CollectionItemPartialSchema>;

// COLLECTION ITEM OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CollectionItemOptionalDefaultsSchema = CollectionItemSchema.merge(
  z.object({
    id: z.string().uuid().optional(),
  }),
);

export type CollectionItemOptionalDefaults = z.infer<
  typeof CollectionItemOptionalDefaultsSchema
>;

export default CollectionItemSchema;
