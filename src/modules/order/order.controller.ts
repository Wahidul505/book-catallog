import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await OrderService.insertIntoDB(userId, req.body);
  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created Successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
};
