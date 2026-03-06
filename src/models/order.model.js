import mongoose from "mongoose";
import  { Schema}  from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be atleast 1"]
        }
        
    }
)

const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: [array => array.length > 0, "Order must have atleast one item"]
    },

    //pricing
    subtotal: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },

    //Delivery details
    deliveryInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },

    //order status
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["card", "cash on delivery"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    }
}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema);