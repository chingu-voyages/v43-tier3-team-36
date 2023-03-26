import { Request, Response } from 'express';
import { User, UserOptionalDefaults } from '@marvel-collector/types/generated';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
} from '../services/user.service';
import { hashPassword } from '../utils/hashPassword';

export const register = async (
  req: Request<{}, {}, UserOptionalDefaults>,
  res: Response,
) => {
  try {
    const { username, password, firstName, email, lastName } = req.body;
    const findUser = await findUserByUsername({ username });
    if (findUser) {
      return res.status(400).json({ message: 'username already taken' });
    }

    const hashedPassword = await hashPassword(password);
    const tempUser = { ...req.body, password: hashedPassword };

    await createUser(tempUser);
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

export const login = async (req: Request, res: Response) =>
  res.status(200).json({ message: 'Login successful' });

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
    return res.status(200).json({
      user: {
        userId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
        profileImage: user?.profileImage,
      },
    });
  } catch (error) {

    return res.status(400).json(error);
  }
};
