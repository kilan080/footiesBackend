import { Router } from "express"
import { loginAdmin, createAdmin } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { adminProfile } from "../controllers/admin.controller.js";
import { getAllUsers } from "../controllers/admin.controller.js";

const adminRoutes = Router();

adminRoutes.post("/register", createAdmin);
adminRoutes.post("/login", loginAdmin)
adminRoutes.get("/users", getAllUsers);

adminRoutes.get("/me", verifyAdmin, adminProfile);

export default adminRoutes;