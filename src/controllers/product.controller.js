import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";

export const createProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "New product created successfully",
      product,
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


    console.log(product, "products");
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

export const getAProducts = async (req, res) => {
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
    return res.status(StatusCodes.OK).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      success: false,
      message: "Internal server error",
    });
  }
}

export const getPublicProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
}


export const getAllPublicProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(StatusCodes.OK).json({
      success: true,
      count: products.length,
      products,
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
    const fieldsToUpdate = ["name", "description", "price", "category", "stock", "images", ];
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

export const deleteProductStatus = async (req, res) => {
  try {
    const getAllProducts = await Product.find();
      if (getAllProducts.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "No products found"
        });
      }
      
      const filter = {  }; // Filter for documents to update, use {} to update all documents
      const update = { $unset: { status:  ''} }; // Field to remove

      await Product.updateMany(filter, update);


      res.status(StatusCodes.OK).json({
      success: true,
      message: "Product delete status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }

}