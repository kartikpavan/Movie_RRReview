const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY,
   secure: true,
});

// Uploading Trailer only
const uploadTrailer = async (req, res) => {
   const { file } = req;
   if (!file) return res.json({ error: "Video File Missing" });

   const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
   });

   res.status(201).json({ url: secure_url, public_id });
};

module.exports = { uploadTrailer };
