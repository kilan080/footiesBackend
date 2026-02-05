import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (req, res, next) => {
    try {
        // multer.single("image") gives req.file
        if (!req.file) {
            return next();
        }

        console.log('Uploading to Cloudinary...');
        console.log('Config check:', {
            cloud: cloudinary.config().cloud_name,
            hasKey: !!cloudinary.config().api_key,
            hasSecret: !!cloudinary.config().api_secret
        });

        // convert buffer to base64
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(file, {
            folder: "footies",
        });

        // attach image URL to request body
        req.body.imageUrl = [result.secure_url];

        next();
    } catch (error) {
        next(error);
    }
};
