import { StatusCodes } from "http-status-codes";

export const validate = (schema) => (req, res, next) => {
    // Normalize images to array if it came as a string from FormData
    if (typeof req.body.images === "string") {
        req.body.images = [req.body.images];
    }

    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
    });

    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((detail) => detail.message),
        });
    }

    // Merge instead of replace — preserves anything set by prior middleware
    req.body = { ...req.body, ...value };
    next();
};