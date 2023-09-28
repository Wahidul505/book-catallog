import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await ProfileService.getUserProfile(userId);
  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Profile fetched successfully',
    data: result,
  });
});

export const ProfileController = {
  getUserProfile,
};
