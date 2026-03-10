import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req, res) => {
    try {
        if(!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "A request body is required to create an order"
            })
        }
        const {items, subtotal, deliveryFee, total, deliveryInfo, paymentMethod} = req.body;

        if(!items || !subtotal || !deliveryFee || !total === undefined || !deliveryInfo || !paymentMethod) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required to create an order"
            })
        }

        // Check stock availability before creating order
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: `Product ${item.name} no longer exists`,
                });
            }
            if (product.stock < item.quantity) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}. Only ${product.stock} left.`,
                });
            }
        }

        const userId = req.user.id;
        const order = await Order.create({userId, items, subtotal, deliveryFee, total, deliveryInfo, paymentMethod});

        // Reduce stock for each product
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error("CREATE ORDER ERROR:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(StatusCodes.OK).json({
            success: true,
            orders,
        })
    } catch (error) {
        console.error("GET ORDERS ERROR:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const order = await Order.findOne({_id: id, userId});

        if(!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            })
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            order,
        })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } =req.params;

        const order = await Order.findOne({ _id: id, userId });

        if (!order)  {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            })
        }

        if(order.status !== "pending") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Only pending orders can be cancelled",
            })
        }

        order.status = "cancelled";
        await order.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}