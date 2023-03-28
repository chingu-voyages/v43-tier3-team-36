import { z } from 'zod';
import {
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
) => prisma.user.create({
  data: {
    firstName,
    lastName,
    username,
    password,
    email,
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
  });

  return user;
};
