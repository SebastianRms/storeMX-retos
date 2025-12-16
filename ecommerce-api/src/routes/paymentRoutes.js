// src/routes/paymentRoutes.js
import { Router } from 'express';
import { createPaymentMethod, getPaymentMethods, deletePaymentMethod } from '../controllers/paymentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Todas las rutas de pago requieren estar logueado
router.use(authMiddleware);

// Rutas base: /api/payment-methods
router.route('/')
  .get(getPaymentMethods)      // Obtener lista
  .post(createPaymentMethod);  // Crear nueva tarjeta

// Rutas con ID: /api/payment-methods/:id
router.route('/:id')
  .delete(deletePaymentMethod); // Eliminar tarjeta

export default router;