import { StatusCodes } from "http-status-codes";
export const validate = (schema) => (req, res, next) => {
    const { error, value} = schema.validate(req.body, {
        abortEarly: false,
    });

    if(error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((detail) => detail.message),
        });
    }
    req.body = value;
    next();
}