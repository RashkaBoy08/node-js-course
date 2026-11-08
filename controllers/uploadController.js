import cloudinary from "../utils/cloudinary.js";

export const uploadFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "Dugsiiye",
      resource_type: "auto",
    },
    (error, result) => {
      if (error) return next(error);

      return res.status(201).json({
        success: true,
        fileUrl: result.secure_url,
      });
    },
  );

  stream.end(req.file.buffer);
};
