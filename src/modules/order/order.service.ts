import { Order } from '@prisma/client';
import httpStatus from 'http-status';
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

const getAllFromDB = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
};
