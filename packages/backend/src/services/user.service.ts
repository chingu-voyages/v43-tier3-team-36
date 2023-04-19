import { z } from 'zod';
import {
  User,
  UserOptionalDefaults,
  UserPartial,
} from '@marvel-collector/types/generated/';
import prisma from '../database/PrismaClient';

export const createUser = (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  email: string,
  city: string,
  country: string,
  bannerImage: string,
) => prisma.user.create({
  data: {
    firstName,
    lastName,
    username,
    password,
    email,
    city,
    country,
    bannerImage,
  },
});

export const findUserByUsername = async (payload: UserPartial) => {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });
  return user;
};

export const findUser = async (payload: UserPartial) => {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  return user;
};
export const findUserByEmail = async (payload: UserPartial) => {
  await prisma.user.findUnique({
    where: {
      username: payload.email,
    },
  });
};

export const findUserById = async (payload: UserPartial) => {
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
    include: { collection: true, tradeOffers: true },
  });

  return user;
};

export const findUsersWithComic = async (comicId: number) => {
  const users = await prisma.collectionItem.findMany({
    where: {
      comicId,
    },
    include: { user: true },
  });

  const filtered = users.reduce(
    (a: {}[], b) => [
      ...a,
      {
        username: b.user?.username,
        location: b.user?.country,
        profileImage: b.user?.profileImage,
      },
    ],
    [],
  );

  return filtered;
};
export const updateUserDetail = async (id: string, dataToUpdate: any) => prisma.user.update({
  where: { id },
  data: dataToUpdate,
  select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    profileImage: true,
    city: true,
    country: true,
    bannerImage: true,
  },
});
