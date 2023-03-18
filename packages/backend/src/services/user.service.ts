import  prisma  from "../database/PrismaClient"
import { UserOptionalDefaults, UserPartial, } from "../schemas";

//the user is underlined because we don't have a user schema yet

export const createUser = (payload: UserOptionalDefaults) => {
  return prisma.user.create({
    data: payload
  });
}

export const findUserByUsername = (payload: UserPartial) => {
  return prisma.user.findUnique({
    where: {
      username: payload.username
    }
  });
}

export const findUser = async (payload: UserPartial) => {
  return prisma.user.findUnique({
    where: {
      username: payload.username
    }
  }); 
}

export const findUserById = async (payload: UserPartial) => {
  return prisma.user.findUnique({
    where: {
      id: payload.id
    }
  });
}