import { z } from 'zod';

// USER SCHEMA
// This schema is incomplete

export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z.string().min(4).max(10),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// USER PARTIAL SCHEMA
// this schema allows partial updates

export const UserPartialSchema = UserSchema.partial();

export type UserPartial = z.infer<typeof UserPartialSchema>;

// USER OPTIONAL DEFAULTS SCHEMA
// this schema allows you to omit data and it automatically fills it for you

export const UserOptionalDefaultsSchema = UserSchema.merge(
  z.object({
    id: z.string().cuid().optional(),
  }),
);

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>;

export default UserSchema;
