import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.getAllFromDB(user as JwtPayload);
  sendResponse<Order[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders fetched Successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.getDataById(
    user as JwtPayload,
    req.params.orderId
  );
  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order fetched Successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
