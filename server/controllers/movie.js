const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");

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
      title, // "some title" //*
      storyLine, // "Some description" //*
      director, // "Some name"
      releaseDate, // "07-12-2009" //*
      status, // "private" //*
      type, // "movie" //*
      genres, // ["Sci-fi", "Action","Adventure"] //*
      tags, // ["action","movie","hollywood"] //*
      cast, // [{actor:"sds1212sdf",roleAs:"John Doe",leadActor:true}] //*
      writers, // ['12121','asd231]
      trailer, // {url:'https:://', public_id:"sdsdqw1212"} //*
      language, // "english" //*
   } = body;
   console.log(req.body);

   const newMovie = Movie({
      title,
      storyLine,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      trailer,
      language,
   });

   // director and writers are optional fields hence, explicit checking
   if (director) {
      if (!isValidObjectId(director)) return res.json({ error: "Invalid Director Id" });
      newMovie.director = director;
   }
   if (writers) {
      for (let writer of writers) {
         if (!isValidObjectId(writer)) return res.json({ error: "Invalid Writer " });
      }
      newMovie.writers = writers;
   }

   // Uploading Poster
   const { secure_url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(
      file.path,
      {
         transformation: {
            width: 1280,
            height: 720,
         },
         responsive_breakpoints: {
            create_derived: true,
            max_width: 640,
            max_images: 3,
         },
      }
   );
   // creating poster object for pushing inside DB
   const poster = { url: secure_url, public_id, responsiveImages: [] };
   const breakpoints = responsive_breakpoints[0];
   if (breakpoints.length) {
      // extracting single images from breakpoint array and pushing it into DB
      for (let img of breakpoints) {
         const { secure_url } = img;
         poster.responsiveImages.push(secure_url);
      }
   }

   newMovie.poster = poster;

   const savedMovie = await newMovie.save();

   res.status(201).json({
      data: {
         id: savedMovie._id,
         title: savedMovie.title,
      },
   });
};

module.exports = { uploadTrailer, createMovie };
