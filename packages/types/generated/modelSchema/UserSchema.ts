import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  username: z.string(),
  profileImage: z.string().nullable(),
  city: z.string(),
  country: z.string(),
  bannerImage: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().uuid().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

export default UserSchema;
