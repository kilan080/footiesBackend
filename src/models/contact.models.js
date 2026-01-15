import mongoose, { Schema } from "mongoose";

const contactSchemma = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true

        },
        message: {
            type: String,
            required: true
        },
    },
    { timestamps: true }

    
);

export const Contact = mongoose.model("Contact", contactSchemma);
