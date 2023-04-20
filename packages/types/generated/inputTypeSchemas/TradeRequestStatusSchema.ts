import { z } from 'zod';

export const TradeRequestStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'DECLINED',
]);

export type TradeRequestStatusType = `${z.infer<
  typeof TradeRequestStatusSchema
>}`;

export default TradeRequestStatusSchema;
