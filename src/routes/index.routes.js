import { verifyAdmin } from "../middleware/auth.middleware.js";
import adminRoutes from "./admin.routes.js";
import contactRoutes from "./contact.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import productRoutes from "./product.routes.js";
import { Router } from "express";

const router = Router();

router.use("/contacts", contactRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/admin", adminRoutes);
router.use("/admin/products", verifyAdmin, productRoutes);




export default router;
