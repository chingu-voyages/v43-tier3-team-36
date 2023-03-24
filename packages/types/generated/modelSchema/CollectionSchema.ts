import { z } from 'zod';

/////////////////////////////////////////
// COLLECTION SCHEMA
/////////////////////////////////////////

export const CollectionSchema = z.object({
  id: z.string().uuid(),
  comicId: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  userId: z.string(),
});

export type Collection = z.infer<typeof CollectionSchema>;

// COLLECTION PARTIAL SCHEMA
//------------------------------------------------------

export const CollectionPartialSchema = CollectionSchema.partial();

export type CollectionPartial = z.infer<typeof CollectionPartialSchema>;

// COLLECTION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CollectionOptionalDefaultsSchema = CollectionSchema.merge(
  z.object({
    id: z.string().uuid().optional(),
  }),
);

export type CollectionOptionalDefaults = z.infer<
  typeof CollectionOptionalDefaultsSchema
>;

export default CollectionSchema;
