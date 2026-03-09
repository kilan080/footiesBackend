import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";
import adminRoutes from "./admin.routes.js";
import contactRoutes from "./contact.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.route.js";
import publicProductRoutes from "./publicProduct.routes.js";
import orderRoutes from "./order.routes.js";
import { Router } from "express";
import adminOrderRoutes from "./admin.order.routes.js";


const router = Router();

router.use("/contacts", contactRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/admin", adminRoutes);
router.use("/admin/products", verifyAdmin, productRoutes);
router.use("/products", publicProductRoutes);
router.use("/user", userRoutes);
router.use("/orders",  orderRoutes);
router.use("/admin/orders", adminOrderRoutes);




export default router;
