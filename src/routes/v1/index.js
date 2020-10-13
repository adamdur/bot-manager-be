import express from 'express';

const router = express.Router();

import AdminBotsRoutes from './admin/bots/bots.route'
router.use('/admin/bots', AdminBotsRoutes);

import AdminUsersRoutes from './admin/users/users.route'
router.use('/admin/users', AdminUsersRoutes);

import botsRoutes from './bots/bots.route'
router.use('/bots', botsRoutes);

import usersRoutes from './users/users.route'
router.use('/users', usersRoutes);

import userRoutes from './user/user.route'
router.use('/user', userRoutes);

import authRoutes from './auth/auth.route'
router.use('/auth', authRoutes);

export default router;
