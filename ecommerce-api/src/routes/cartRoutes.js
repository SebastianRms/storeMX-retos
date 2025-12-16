import express from 'express';
import {
  addProductToCart,
  removeProductFromCart,
  getCartByUser,
  updateProductQuantity,
  clearCart,
  getCarts,     
  getCartById,  
  createCart,   
  updateCart,   
  deleteCart   
} from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/add-product', authMiddleware, addProductToCart);

router.put('/update-quantity', authMiddleware, updateProductQuantity);

router.delete('/clear', authMiddleware, clearCart);

router.get('/user/:id', authMiddleware, getCartByUser);

router.delete('/product/:productId', authMiddleware, removeProductFromCart);


router.get('/', authMiddleware, getCarts);

router.post('/', authMiddleware, createCart);

router.get('/:id', authMiddleware, getCartById);

router.put('/:id', authMiddleware, updateCart);

router.delete('/:id', authMiddleware, deleteCart);

export default router;