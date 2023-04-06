import { z } from 'zod';
import { TradeRequestStatusSchema } from '../inputTypeSchemas/TradeRequestStatusSchema';

/////////////////////////////////////////
// TRADE REQUEST SCHEMA
/////////////////////////////////////////

export const TradeRequestSchema = z.object({
  status: TradeRequestStatusSchema,
  id: z.string().uuid(),
  receiverId: z.string(),
  tradeOfferId: z.string(),
  receiverComicId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
});

export type TradeRequest = z.infer<typeof TradeRequestSchema>;

// TRADE REQUEST PARTIAL SCHEMA
//------------------------------------------------------

export const TradeRequestPartialSchema = TradeRequestSchema.partial();

export type TradeRequestPartial = z.infer<typeof TradeRequestPartialSchema>;

// TRADE REQUEST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TradeRequestOptionalDefaultsSchema = TradeRequestSchema.merge(
  z.object({
    status: TradeRequestStatusSchema.optional(),
    id: z.string().uuid().optional(),
    createdAt: z.coerce.date().optional(),
  }),
);

export type TradeRequestOptionalDefaults = z.infer<
  typeof TradeRequestOptionalDefaultsSchema
>;

export default TradeRequestSchema;
