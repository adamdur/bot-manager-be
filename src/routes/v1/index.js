import express from 'express';
import usersRoutes from './users/users.route'
import authRoutes from './auth/auth.route'

const router = express.Router();

router.use('/users', usersRoutes);

router.use('/auth', authRoutes);

export default router;
