import { z } from 'zod';

export const TradeOfferScalarFieldEnumSchema = z.enum([
  'id',
  'type',
  'status',
  'createdById',
  'price',
  'phoneNumber',
  'email',
  'message',
  'wantedComicId',
  'createdAt',
]);

export default TradeOfferScalarFieldEnumSchema;
