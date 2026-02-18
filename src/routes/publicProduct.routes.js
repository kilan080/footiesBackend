import { Router } from 'express';
import { getAllPublicProducts, getPublicProduct } from '../controllers/product.controller.js';

const router = Router();
router.get('/:id', getPublicProduct);
router.get('/', getAllPublicProducts);

export default router;


