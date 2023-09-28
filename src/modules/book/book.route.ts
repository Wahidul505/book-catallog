import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);

router.get('/', BookController.getAllFromDB);

router.get('/:id', BookController.getDataById);

router.get('/:categoryId/category', BookController.getByCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateData
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteData);

export const BookRoutes = router;
