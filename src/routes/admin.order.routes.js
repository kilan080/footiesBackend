import { Router } from "express";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { getAllOrders, updateOrderStatus, getAdminSingleOrder, deleteOrder } from "../controllers/admin.order.controller.js";

const adminOrderRoutes = Router();

adminOrderRoutes.get("/", verifyAdmin, getAllOrders);
adminOrderRoutes.put("/:id/status", verifyAdmin, updateOrderStatus);
adminOrderRoutes.get("/:id", verifyAdmin, getAdminSingleOrder);
adminOrderRoutes.delete("/:id", verifyAdmin, deleteOrder);

export default adminOrderRoutes;
