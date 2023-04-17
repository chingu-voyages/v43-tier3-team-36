import { z, ZodArray } from 'zod';

export const RegisterSchema = z.object({
  // In this example we will only validate the body for registration.
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    username: z.string().min(2).max(20),
    city: z.string().min(1).max(40),
    country: z.string().min(1).max(40),
  }),
});

// In this example we will only validate the request body for login.
export const LoginSchema = z.object({
  body: z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(6),
  }),
});

// In this example we will validate the request body for assigning collection to user

export const AssignComicSchema = z.object({
  body: z.object({
    comicId: z
      .number({
        required_error: 'ComicId is required',
        invalid_type_error: 'ComicId must be a number',
      })
      .min(1),
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(2)
      .max(100),
    imageUrl: z
      .string({
        required_error: 'ImageUrl is required',
        invalid_type_error: 'ImageUrl must be a string',
      })
      .min(4),
  }),
});

export const TradeOfferSchema = z.object({
  body: z.object({
    type: z.string({
      required_error: 'Type is required',
      invalid_type_error: 'Type must be a string',
    }),
    comicId: z.number({
      required_error: 'ComicId is required',
      invalid_type_error: 'ComicId must be a number',
    }),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    price: z.number().optional(),
    message: z.string().optional(),
  }),
});

export const TradeRequestSchema = z.object({
  body: z.object({
    receiverComicId: z
      .number({
        required_error: 'ComicId is required',
        invalid_type_error: 'ComicId must be a number',
      })
      .optional(),
    tradeOfferId: z.string({
      required_error: 'tradeOfferId is required',
      invalid_type_error: 'tradeOfferId must be a string',
    }),
  }),
});

export const updateUserSchema = z.object({
  // In this example we will only validate the body for user update.
  body: z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    firstName: z.string().min(2).max(20).optional(),
    lastName: z.string().min(2).max(20).optional(),
    username: z.string().min(2).max(20).optional(),
    city: z.string().min(2).max(40).optional(),
    country: z.string().min(2).max(40).optional(),
    profileImage: z.string().min(2).optional(),
    bannerImage: z.string().min(2).max(30).optional(),
  }),
});
