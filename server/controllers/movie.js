const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY,
   secure: true,
});

// Uploading Trailer only @POST
const uploadTrailer = async (req, res) => {
   const { file } = req;
   if (!file) return res.json({ error: "Video File Missing" });

   const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
   });

   res.status(201).json({ url: secure_url, public_id });
};

// create new Movie @POST
const createMovie = async (req, res) => {
   const { file, body } = req;
   const {
      title, // "some titme" //!
      storyLine, // "Some description" //!
      director, // "Some name"
      releaseDate, // "07-12-2009" //!
      status, // "private" //!
      type, // "movie" //!
      genres, // ["Sci-fi", "Action","Adventure"] //!
      tags, // ["action","movie","hollywood"] //!
      cast, // [{id:"sds1212sdf",roleAs:"John Doe",leadActor:true}] //!
      writers, // ['12121','asd231]
      poster, // File //!
      trailer, // {url:'https:://, public_id:"sdsdqw1212"} //!
      language, // "english" //!
   } = body;

   res.send("Movie Create");
};

module.exports = { uploadTrailer, createMovie };
