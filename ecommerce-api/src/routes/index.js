import express from 'express';

import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';
import cartRoutes from './cartRoutes.js';
import shippingAddressRoutes from './shippingAddressRoutes.js';
import paymentRoutes from './paymentRoutes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use(categoryRoutes);
router.use(orderRoutes);
router.use(productRoutes);
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/shipping-address', shippingAddressRoutes);
router.use('/payment-methods', paymentRoutes);

export default router;