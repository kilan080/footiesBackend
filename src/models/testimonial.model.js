import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true
        },
        isAprroved: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);