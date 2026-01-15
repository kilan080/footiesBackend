import { Testimonial } from "../models/testimonial.model.js";

export const createTestimonial = async (req, res) => {
    try {
        const { name, role, message } = req.body;

        //basic validation
        if(!name || !message) {
            return res.status(400).json({
                message: "Name and Message are required"
            })
        }

        await Testimonial.create({
            name,
            role,
            message
        })
        return res.status(201).json({
            message: "Testimonial created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }
}

export const getTestimonials = async (req, res) => {
    try {
        const testimonial = await Testimonial.find().sort({ createdAt: -1});
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching testimonials"
            
        })
    }
}