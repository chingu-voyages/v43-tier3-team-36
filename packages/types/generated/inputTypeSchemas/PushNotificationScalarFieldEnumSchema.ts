import { z } from 'zod';

export const PushNotificationScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'message',
  'isRead',
  'createdAt',
]);

export default PushNotificationScalarFieldEnumSchema;
