import { z } from 'zod';
import { TradeOfferTypeSchema } from '../inputTypeSchemas/TradeOfferTypeSchema';
import { TradeOfferStatusSchema } from '../inputTypeSchemas/TradeOfferStatusSchema';

/////////////////////////////////////////
// TRADE OFFER SCHEMA
/////////////////////////////////////////

export const TradeOfferSchema = z.object({
  type: TradeOfferTypeSchema,
  status: TradeOfferStatusSchema,
  id: z.string().uuid(),
  createdById: z.string(),
  price: z.number().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  message: z.string().nullable(),
  wantedComicId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
});

export type TradeOffer = z.infer<typeof TradeOfferSchema>;

// TRADE OFFER PARTIAL SCHEMA
//------------------------------------------------------

export const TradeOfferPartialSchema = TradeOfferSchema.partial();

export type TradeOfferPartial = z.infer<typeof TradeOfferPartialSchema>;

// TRADE OFFER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TradeOfferOptionalDefaultsSchema = TradeOfferSchema.merge(
  z.object({
    status: TradeOfferStatusSchema.optional(),
    id: z.string().uuid().optional(),
    createdAt: z.coerce.date().optional(),
  }),
);

export type TradeOfferOptionalDefaults = z.infer<
  typeof TradeOfferOptionalDefaultsSchema
>;

export default TradeOfferSchema;
