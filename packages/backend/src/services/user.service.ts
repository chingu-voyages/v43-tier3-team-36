import { z } from 'zod';
import {
  UserOptionalDefaults,
  UserPartial,
} from '@marvel-collector/types/generated';
import prisma from '../database/PrismaClient';

export const createUser = async (payload: UserOptionalDefaults) => {
  const user = await prisma.user.create({
    data: payload,
  });

  return user;
};

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
