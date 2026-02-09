import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required().trim().min(3).max(100),
    price: Joi.number().required().positive(),
    description: Joi.string().required().trim().min(10).max(100),
    category: Joi.string().required().trim().min(3).max(50),
    stock: Joi.number().required().min(0),
    images: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .required(),
    status:Joi.string().valid("available", "out of stock").default(true),
}).min(1);;