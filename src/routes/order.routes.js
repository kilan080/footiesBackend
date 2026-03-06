import { Router } from 'express';
import { createOrder, getUserOrders, getSingleOrder, cancelOrder } from '../controllers/order.controller.js';
import { verifyUser } from '../middleware/auth.middleware.js';

const orderRoutes = Router();

orderRoutes.post('/', verifyUser, createOrder);
orderRoutes.get('/all', verifyUser, getUserOrders);
orderRoutes.get('/:id', verifyUser, getSingleOrder);
orderRoutes.put('/cancel/:id', verifyUser, cancelOrder);


export default orderRoutes;