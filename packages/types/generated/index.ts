import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ComicScalarFieldEnumSchema = z.enum(['id','userId']);

export const HistoryItemScalarFieldEnumSchema = z.enum(['tradeType','comidId','historyUserId']);

export const HistoryScalarFieldEnumSchema = z.enum(['userId']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','userId','accepted','type','transactionsId']);

export const TransactionsScalarFieldEnumSchema = z.enum(['id','userId']);

export const UserScalarFieldEnumSchema = z.enum(['id','firstName','lastName','email','password','username','profileImage']);

export const TradeTypeSchema = z.enum(['EXCHANGE','BUY','SELL']);

export type TradeTypeType = `${z.infer<typeof TradeTypeSchema>}`

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
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COMIC SCHEMA
/////////////////////////////////////////

export const ComicSchema = z.object({
  id: z.string(),
  userId: z.number().int().nullable(),
})

export type Comic = z.infer<typeof ComicSchema>

/////////////////////////////////////////
// HISTORY ITEM SCHEMA
/////////////////////////////////////////

export const HistoryItemSchema = z.object({
  tradeType: TradeTypeSchema,
  comidId: z.string(),
  historyUserId: z.number().int().nullable(),
})

export type HistoryItem = z.infer<typeof HistoryItemSchema>

/////////////////////////////////////////
// HISTORY SCHEMA
/////////////////////////////////////////

export const HistorySchema = z.object({
  userId: z.number().int(),
})

export type History = z.infer<typeof HistorySchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  type: TradeTypeSchema,
  id: z.string(),
  userId: z.number().int(),
  accepted: z.boolean(),
  transactionsId: z.string().nullable(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// TRANSACTIONS SCHEMA
/////////////////////////////////////////

export const TransactionsSchema = z.object({
  id: z.string(),
  userId: z.number().int(),
})

export type Transactions = z.infer<typeof TransactionsSchema>
