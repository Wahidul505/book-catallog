import { User } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../shared/prisma';

const signUp = async (payload: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data: payload,
  });
  // eslint-disable-next-line no-unused-vars
  const { password, ...userInfo } = result;
  return userInfo;
};

const signIn = async (payload: Partial<User>): Promise<string> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  if (isUserExist.password !== payload.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password didn't matched");
  }

  const userInfo = {
    role: isUserExist.role,
    userId: isUserExist.id,
  };

  const token = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  return token;
};

export const AuthService = {
  signUp,
  signIn,
};
