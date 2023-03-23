import { z } from 'zod';
import {
  UserOptionalDefaults,
  UserPartial,
} from '@marvel-collector/types/generated';
import prisma from '../database/PrismaClient';

export const createUser = (payload: UserOptionalDefaults) => {
  try {
    prisma.user.create({
      data: { ...payload },
    });
  } catch (e) {
    console.log(e);
  }
};

export const findUserByUsername = (payload: UserPartial) =>
  prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

export const findUser = async (payload: UserPartial) =>
  prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });
export const findUserByEmail = async (payload: UserPartial) =>
  prisma.user.findUnique({
    where: {
      username: payload.email,
    },
  });

export const findUserById = async (payload: UserPartial) =>
  prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });
