import { Request, Response } from 'express';
import {
  User,
  UserOptionalDefaults,
} from '@marvel-collector/types/generated/modelSchema/UserSchema';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
} from '../services/user.service';
import { hashPassword } from '../utils/hashPassword';
import { viewUserTradeOffers } from '../services/collection.service';

export const register = async (
  req: Request<{}, {}, UserOptionalDefaults>,
  res: Response,
) => {
  try {
    const {
      username, password, firstName, email, lastName,
    } = req.body;
    const findUser = await findUserByUsername({ username });
    if (findUser) {
      return res.status(400).json({ message: 'username already taken' });
    }

    const hashedPassword = await hashPassword(password);
    // const tempUser = { ...req.body, password: hashedPassword };

    const newUser = await createUser(
      firstName,
      lastName,
      username,
      hashedPassword,
      email,
    );

    return res.status(201).json({
      message: 'user created successfully',
      user: {
        username,
        firstName,
        email,
        lastName,
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// eslint-disable-next-line max-len

export const login = async (req: Request, res: Response) => res.status(200).json({ message: 'Login successful' });

export const logout = async (req: Request, res: Response) => {
  req.logOut((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const user = await findUserById({ id });
    const userTradeOffers = await viewUserTradeOffers(id);

    return res.status(200).json({
      user: {
        userId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
        profileImage: user?.profileImage,
        location: user?.location,
        collection: user?.collection.map((item: any) => ({
          id: item.id,
          comicId: item.comicId,
          title: item.title,
          imageUrl: item.imageUrl,
        })),
        tradeOfferDetail: userTradeOffers.map((tradeOffer: any) => ({
          tradeOfferId: tradeOffer.id,
          type: tradeOffer.type,
          status: tradeOffer.status,
          message: tradeOffer.message,
          price: tradeOffer.price,
          createdAt: tradeOffer.createdAt,
          contactDetails: {
            email: tradeOffer.email,
            phoneNumber: tradeOffer.phoneNumber,
          },
          tradeOfferItems: {
            collectionId: tradeOffer.collection[0].id,
            comicId: tradeOffer.collection[0].comicId,
            title: tradeOffer.collection[0].title,
            imageUrl: tradeOffer.collection[0].imageUrl,
            tradeOfferId: tradeOffer.collection[0].tradeOfferId,
          },
        })),
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as User;
    const user = await findUserById({ id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userTradeOffers = await viewUserTradeOffers(id);

    return res.status(200).json({
      user: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        location: user.location,
        collection: user.collection.map((item: any) => ({
          id: item.id,
          comicId: item.comicId,
          title: item.title,
          imageUrl: item.imageUrl,
        })),
        tradeOfferDetail: userTradeOffers.map((tradeOffer: any) => ({
          tradeOfferId: tradeOffer.id,
          type: tradeOffer.type,
          status: tradeOffer.status,
          message: tradeOffer.message,
          price: tradeOffer.price,
          createdAt: tradeOffer.createdAt,
          contactDetails: {
            email: tradeOffer.email,
            phoneNumber: tradeOffer.phoneNumber,
          },
          tradeOfferItems: {
            collectionId: tradeOffer.collection[0].id,
            comicId: tradeOffer.collection[0].comicId,
            title: tradeOffer.collection[0].title,
            imageUrl: tradeOffer.collection[0].imageUrl,
            tradeOfferId: tradeOffer.collection[0].tradeOfferId,
          },
        })),
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
