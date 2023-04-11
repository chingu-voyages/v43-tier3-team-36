import { z } from 'zod';

export const PushNotificationScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'message',
  'createdAt',
]);

export default PushNotificationScalarFieldEnumSchema;
