import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'firstName',
  'lastName',
  'email',
  'password',
  'username',
  'profileImage',
  'location',
  'collection',
]);

export default UserScalarFieldEnumSchema;
