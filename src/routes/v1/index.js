import express from 'express';

const router = express.Router();

import botsRoutes from './bots/bots.route'
router.use('/bots', botsRoutes);

import usersRoutes from './users/users.route'
router.use('/users', usersRoutes);

import authRoutes from './auth/auth.route'
router.use('/auth', authRoutes);

export default router;
