import mongoose from "mongoose";
import  { Schema}  from "mongoose";

const productSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative']
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Stock cannot be negative'],
        },
        images: {
            type: [String],
            required: true,
            validate: [array => array.length > 0, "At least one image is required"]
        },
    },
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema);
