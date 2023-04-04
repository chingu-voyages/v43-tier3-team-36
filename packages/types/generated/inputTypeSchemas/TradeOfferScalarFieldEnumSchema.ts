import { z } from 'zod';

export const TradeOfferScalarFieldEnumSchema = z.enum(['id','type','status','createdById','price','phoneNumber','email','message','createdAt']);

export default TradeOfferScalarFieldEnumSchema;
