import { z } from 'zod';

export const TradeOfferScalarFieldEnumSchema = z.enum([
  'id',
  'type',
  'status',
  'createdById',
  'price',
  'phoneNumber',
  'message',
  'createdAt',
]);

export default TradeOfferScalarFieldEnumSchema;
