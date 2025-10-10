import express from 'express';

import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use(categoryRoutes);
router.use(orderRoutes);
router.use(productRoutes);
router.use('/users', userRoutes);

export default router;