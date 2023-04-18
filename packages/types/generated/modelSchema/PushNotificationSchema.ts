import { z } from 'zod';

/////////////////////////////////////////
// PUSH NOTIFICATION SCHEMA
/////////////////////////////////////////

export const PushNotificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
})

export type PushNotification = z.infer<typeof PushNotificationSchema>

/////////////////////////////////////////
// PUSH NOTIFICATION PARTIAL SCHEMA
/////////////////////////////////////////

export const PushNotificationPartialSchema = PushNotificationSchema.partial()

export type PushNotificationPartial = z.infer<typeof PushNotificationPartialSchema>

/////////////////////////////////////////
// PUSH NOTIFICATION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PushNotificationOptionalDefaultsSchema = PushNotificationSchema.merge(z.object({
  id: z.string().uuid().optional(),
  isRead: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type PushNotificationOptionalDefaults = z.infer<typeof PushNotificationOptionalDefaultsSchema>

export default PushNotificationSchema;
