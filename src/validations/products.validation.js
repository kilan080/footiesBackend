import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required().trim().min(3).max(100),
    price: Joi.alternatives().try(Joi.number().positive(), Joi.string().pattern(/^\d+(\.\d+)?$/)).required(),
    description: Joi.string().required().trim().min(10).max(100),
    category: Joi.string().required().trim().min(3).max(50),
    stock: Joi.alternatives().try(Joi.number().min(0), Joi.string().pattern(/^\d+$/)).required(),
    images: Joi.alternatives().try(
        Joi.array().items(Joi.string().uri()).min(1),
        Joi.string().uri()
    ).required(),
    status: Joi.string().valid("available", "out of stock").optional(),
}).min(1);