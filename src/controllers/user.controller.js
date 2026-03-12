import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({
                message: "A request body is required to create a user",
            });
        }
        const { firstName, lastName,  email, password, phone, addresses } = req.body;

        if (!firstName || !lastName || !email || !password || !phone || !addresses ) {
           return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser)  {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase().trim(),
            password,
            phone: phone || undefined,
            addresses: addresses || [],
        })
        await user.save();

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: "Internal server error",
        });
    }
};

export const userLogin = async (req, res) => {
    try {
       if(!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }   
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = await user.comparePasswords(password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email.toLowerCase()
            },
            process.env.JWT_SECRET,
            { expiresIn: "7h" }
        );

        user.lastLogin = new Date();
        await user.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
        
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: "Internal server error",
        });
    }
}

export const userProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",

            })
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            id: user._id,
            firstName: user.firstName,   
            lastName: user.lastName,     
            email: user.email,           
            phone: user.phone,           
            isVerified: user.isVerified, 
            lastLogin: user.lastLogin,   
            createUser: user.createdAt,
        })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, addresses} = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, phone, addresses},
            { new: true}
        ).select("-password");

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User profile updated successfully",
            user,
        })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword} = req.body;
        if(!currentPassword || !newPassword) {
            return res.status(StatusCodes.BAD_REQUEST).JSON({
                success: false,
                message: "All fields are required",
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
            })
        }

        const isMatch = await user.comparePasswords(currentPassword);
        if(!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Current password is incorrect",
            })
        }

        user.password = newPassword;
        await user.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Password changed successfully",
        })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).JSON({
            SUCCESS: FALSE,
            MESSAGE: "Internal server error",
        })
    }
}