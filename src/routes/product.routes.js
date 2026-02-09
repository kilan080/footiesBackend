import { Router } from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { verifyAdmin } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { createProductSchema } from '../validations/products.validation.js';
import {  upload } from '../middleware/multer.middleware.js';
import { uploadToCloudinary } from '../middleware/cloudinary.middleware.js';

const productRoutes = Router();

productRoutes.post('/', verifyAdmin, upload.single("image"), uploadToCloudinary, validate(createProductSchema), createProduct);
productRoutes.get('/', getAllProducts);

productRoutes.put("/:id", verifyAdmin, upload.single("image"), uploadToCloudinary, updateProduct);
productRoutes.delete("/:id", verifyAdmin, deleteProduct);


export default productRoutes;
