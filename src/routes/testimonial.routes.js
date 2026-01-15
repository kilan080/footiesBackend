import { Router } from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonial.controller.js";


const testimonialRoutes = Router();

testimonialRoutes.post("/", createTestimonial);
testimonialRoutes.get("/", getTestimonials);


export default testimonialRoutes;