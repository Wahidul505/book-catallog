import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllFromDB();
  sendResponse<Book[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getDataById(req.params.id);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateData(req.params.id, req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteData(req.params.id);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateData,
  deleteData,
};
