import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    
    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      stock === undefined ||
      !imageUrl ||
      !Array.isArray(imageUrl) ||
      imageUrl.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images: imageUrl,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "New product created successfully",
      product: newProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let filter = {};

    // Apply category filter if provided
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const product = await Product.find(filter);
    return res.status(StatusCodes.OK).json({
      success: true,
      count: product.length,
      products: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid product ID"
      });
    };

    const product = await Product.findById(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product not found"
      });
    }
    const fieldsToUpdate = ["name", "description", "price", "category", "stock", "imageUrl", "status"];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
       product[field] = req.body[field];
      }
    });

    await product.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    const product = await Product.findById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product not found"
      });
    } 
    product.status = false;
    await product.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Product deleted successfully",
      product
    }); 
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      success: false,
      message: "Internal server error",
    });
  }
}