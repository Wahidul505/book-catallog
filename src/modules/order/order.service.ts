import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../enums/user';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';
import { IOrderedBooks } from './order.interface';

const insertIntoDB = async (
  userId: string,
  payload: IOrderedBooks
): Promise<Order | null> => {
  if (payload.orderedBooks.length < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Add Book to your order list');
  }
  const orderedBooks = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId,
      },
    });

    for (let index = 0; index < payload.orderedBooks.length; index++) {
      await transactionClient.orderedBook.create({
        data: {
          bookId: payload.orderedBooks[index].bookId,
          quantity: payload.orderedBooks[index].quantity,
          orderId: order.id,
        },
      });
    }

    return order;
  });

  const result = await prisma.order.findUnique({
    where: {
      id: orderedBooks.id,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getAllFromDB = async (user: JwtPayload): Promise<Order[] | undefined> => {
  let result;
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
  } else if (user.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    });
  }
  return result;
};

const getDataById = async (
  user: JwtPayload,
  id: string
): Promise<Order | null | undefined> => {
  let result;
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else if (user.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findFirst({
      where: {
        id,
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    });

    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
  }
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
