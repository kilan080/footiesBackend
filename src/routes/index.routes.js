import adminRoutes from "./admin.routes.js";
import contactRoutes from "./contact.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import { Router } from "express";

const router = Router();

router.use("/contacts", contactRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/admin", adminRoutes);




export default router;
