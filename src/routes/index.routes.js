import contactRoutes from "./contact.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import { Router } from "express";

const router = Router();

router.use("/contacts", contactRoutes);
router.use("/testimonials", testimonialRoutes);


export default router;
