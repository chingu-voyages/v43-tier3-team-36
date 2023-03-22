import { z } from 'zod';

export const RegisterSchema = z.object({
  // In this example we will only validate the body for registration.
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    username: z.string().min(2).max(20),
  }),
});

// In this example we will only validate the request body for login.
export const LoginSchema = z.object({
  body: z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(6),
  }),
});
