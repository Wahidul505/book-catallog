import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';

const getAllFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany();
  const users = result.map(user => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...userInfo } = user;
    return userInfo;
  });

  return users;
};

const getDataById = async (userId: string): Promise<Partial<User>> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...userInfo } = result;

  return userInfo;
};

const updateData = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const updateData = {
    name: payload.name || isUserExist.name,
    email: payload.email || isUserExist.email,
    contactNo: payload.contactNo || isUserExist.contactNo,
    address: payload.address || isUserExist.address,
    profileImg: payload.profileImg || isUserExist.profileImg,
  };

  await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });

  return updateData;
};

const deleteData = async (id: string): Promise<Partial<User>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  // eslint-disable-next-line no-unused-vars
  const { password, ...deletedUserInfo } = result;
  return deletedUserInfo;
};

export const UserService = {
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
};
