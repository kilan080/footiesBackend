import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    // convert buffer to base64
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    // upload to cloudinary (await the result)
    const result = await cloudinary.uploader.upload(file, {
      folder: "footies",
    });

    // attach URL AFTER result exists
    req.body.images = [result.secure_url];

    next();
  } catch (error) {
    next(error);
  }
};
