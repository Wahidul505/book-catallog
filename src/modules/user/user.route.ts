import express from 'express';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getDataById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateData
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteData);

export const UserRoutes = router;
