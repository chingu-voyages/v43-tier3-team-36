import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'firstName',
  'lastName',
  'email',
  'password',
  'username',
  'profileImage',
  'collection',
]);

export default UserScalarFieldEnumSchema;
