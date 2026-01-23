import { Router } from "express"
import { loginAdmin, createAdmin } from "../controllers/admin.controller.js";

const adminRoutes = Router();

adminRoutes.post("/", createAdmin);
// adminRoutes.post("/", loginAdmin);