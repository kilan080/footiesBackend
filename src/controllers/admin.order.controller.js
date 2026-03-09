import { Order } from "../models/order.model.js";
import { StatusCodes } from "http-status-codes";

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("userId", "firstName lastName email phone")
            .sort({ createdAt: -1 });

        return res.status(StatusCodes.OK).json({
            success: true,
            total: orders.length,
            orders,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get single order
export const getAdminSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate("userId", "firstName lastName email phone");

        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid status value",
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }

        // Prevent going backwards in status
        const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
        const currentIndex = statusOrder.indexOf(order.status);
        const newIndex = statusOrder.indexOf(status);

        if (order.status === "cancelled") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Cannot update a cancelled order",
            });
        }

        if (newIndex < currentIndex && status !== "cancelled") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: `Cannot move order back from ${order.status} to ${status}`,
            });
        }

        order.status = status;

        // Auto mark payment as paid when delivered
        if (status === "delivered") {
            order.paymentStatus = "paid";
        }

        await order.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};