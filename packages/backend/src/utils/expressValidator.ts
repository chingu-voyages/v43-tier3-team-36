import { body, validationResult } from 'express-validator';
// import { unknown } from "zod";

export const regValidator: any = () => {
  body('firstName').isString();
  body('lastName').isString();
  body('email').isEmail();
  body('password').isString().isLength({ min: 8 });
  body('username').isString();
};

// export const UserSchema = z.object({
//  id: z.number().int(),
//  firstName: z.string(),
//  lastName: z.string(),
//  email: z.string(),
//  password: z.string(),
//  username: z.string(),
//  profileImage: z.string().nullable(),
// })
