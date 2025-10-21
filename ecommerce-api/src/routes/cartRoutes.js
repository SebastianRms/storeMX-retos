import express from 'express';

import {
  getCarts,
  getCartById,
  getCartByUser,
  createCart,
  updateCart,
  deleteCart,
  addProductToCart,
  removeProductFromCart
} from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();


router.get('/', authMiddleware, isAdmin, getCarts);
router.get('/:id', authMiddleware, isAdmin, getCartById);
router.get('/user/:id', authMiddleware, getCartByUser);
router.post('/', authMiddleware, createCart);
router.post('/add-product', authMiddleware, addProductToCart);
router.put('/:id', authMiddleware, updateCart);
router.delete('/:id', authMiddleware, deleteCart);
router.delete('/product/:productId', authMiddleware, removeProductFromCart);


export default router;

