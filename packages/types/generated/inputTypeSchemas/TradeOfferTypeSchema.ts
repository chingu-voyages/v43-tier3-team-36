import { z } from 'zod';

export const TradeOfferTypeSchema = z.enum(['EXCHANGE', 'SELL']);

export type TradeOfferTypeType = `${z.infer<typeof TradeOfferTypeSchema>}`;

export default TradeOfferTypeSchema;
