import { z } from 'zod';

export const TradeOfferStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'DECLINED',
]);

export type TradeOfferStatusType = `${z.infer<typeof TradeOfferStatusSchema>}`;

export default TradeOfferStatusSchema;
