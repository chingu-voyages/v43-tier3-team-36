import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CollectionItemScalarFieldEnumSchema = z.enum([
  'id',
  'collectionId',
  'comicId',
  'userId',
]);

export const CollectionScalarFieldEnumSchema = z.enum(['id', 'userId']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'firstName',
  'lastName',
  'email',
  'password',
  'username',
  'profileImage',
]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
  profileImage: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// COLLECTION SCHEMA
/////////////////////////////////////////

export const CollectionSchema = z.object({
  id: z.number().int(),
  userId: z.number().int().nullable(),
});

export type Collection = z.infer<typeof CollectionSchema>;

/////////////////////////////////////////
// COLLECTION ITEM SCHEMA
/////////////////////////////////////////

export const CollectionItemSchema = z.object({
  id: z.number().int(),
  collectionId: z.number().int().nullable(),
  comicId: z.number().int(),
  userId: z.number().int(),
});

export type CollectionItem = z.infer<typeof CollectionItemSchema>;
