import { z } from 'zod';

export const TradeRequestScalarFieldEnumSchema = z.enum([
  'id',
  'receiverId',
  'tradeOfferId',
  'receiverComicId',
  'status',
  'createdAt',
]);

export default TradeRequestScalarFieldEnumSchema;
