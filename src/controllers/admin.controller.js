import { Admin } from '../models/admin.model.js';
import jwt from "jsonwebtoken";  

export const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin already exists",
            });
        }
        console.log("creating admin")

        // Create admin - make sure to await!
        const admin = new Admin({
            email,
            password
        });

        console.log("admin created")
        console.log("saving admin")
        await admin.save()
        console.log("admin saved")
        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server Error",
        });
    }
}

export const loginAdmin = async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await admin.comparePasswords(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        console.log(process.env.JWT_SECRET)
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email.toLowerCase()
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token,
            admin: {
                id: admin._id,
                email: admin.email,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server Error",
        });
    }
}

export const adminProfile = async (req, res) => {
    try {
        
        const { _id, email, createdAt } = req.admin;

        return res.status(200).json({
            success: true,
            admin: {
                id: _id,
                email,
                createdAt,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server Error',
        });
    }
};
