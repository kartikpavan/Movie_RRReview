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
  if (file) {
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
  }

  const savedMovie = await newMovie.save();

  res.status(201).json({
    data: {
      id: savedMovie._id,
      title: savedMovie.title,
    },
  });
};

const updateMovieWithoutPoster = async (req, res) => {
  const { body } = req;

  if (!isValidObjectId(req.params.movieId)) return res.json({ error: "Movie id not Found" });
  const movie = await Movie.findById(req.params.movieId);
  // checking if movie exists inside DB
  if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

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

  movie.title = title;
  movie.storyLine = storyLine;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.tags = tags;
  movie.cast = cast;
  movie.language = language;
  movie.trailer = trailer;

  // director and writers are optional fields hence, explicit checking
  if (director) {
    if (!isValidObjectId(director)) return res.json({ error: "Invalid Director Id" });
    movie.director = director;
  }
  if (writers) {
    for (let writer of writers) {
      if (!isValidObjectId(writer)) return res.json({ error: "Invalid Writer " });
    }
    movie.writers = writers;
  }

  const updatedMovie = await movie.save();

  res.json({ msg: "Movie Updated Successfully", data: updatedMovie });
};

const updateMovieWithPoster = async (req, res) => {
  const { body, file } = req;

  if (!file) return res.json({ error: "Movie Poster file is missing" });

  if (!isValidObjectId(req.params.movieId)) return res.json({ error: "Movie id not Found" });
  const movie = await Movie.findById(req.params.movieId);
  // checking if movie exists inside DB
  if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

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

  movie.title = title;
  movie.storyLine = storyLine;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.tags = tags;
  movie.cast = cast;
  movie.language = language;
  movie.trailer = trailer;

  // director and writers are optional fields hence, explicit checking
  if (director) {
    if (!isValidObjectId(director)) return res.json({ error: "Invalid Director Id" });
    movie.director = director;
  }
  if (writers) {
    for (let writer of writers) {
      if (!isValidObjectId(writer)) return res.json({ error: "Invalid Writer " });
    }
    movie.writers = writers;
  }

  // update POSTER
  // removing poster from cloudinary if there is any
  if (movie.poster?.public_id) {
    const { result } = await cloudinary.uploader.destroy(movie.poster?.public_id);
    if (result !== "ok") {
      res.json({ error: "Could not delete poster from Cloud" });
    }
  }
  // upload new poster inside cloud storage
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
  const finalPoster = { url: secure_url, public_id, responsiveImages: [] };
  const breakpoints = responsive_breakpoints[0];
  if (breakpoints.length) {
    // extracting single images from breakpoint array and pushing it into DB
    for (let img of breakpoints) {
      const { secure_url } = img;
      poster.responsiveImages.push(secure_url);
    }
  }

  movie.poster = finalPoster;
  const updatedMovie = await movie.save();

  res.json({ msg: "Movie Updated Successfully", data: updatedMovie });
};

const removeMovie = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return res.json({ error: "Movie id not Found" });

  const movie = await Movie.findById(movieId);
  //check if the movie exists inside the DB
  if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

  // removing poster from cloudinary if there is any
  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok") {
      res.json({ error: "Could not delete poster from Cloud" });
    }
  }
  // removing Video Trailer from cloudinary if there is any
  const trailerId = movie.trailer?.public_id;
  if (!trailerId) {
    return res.status(404).json({ error: "Movie Trailer public_id Not found inside Cloud" });
  }
  const { result } = await cloudinary.uploader.destroy(trailerId, { resource_type: "video" });
  if (result !== "ok") {
    res.json({ error: "Could not delete trailer from Cloud" });
  }
  // removing movie data from Mongo db
  await Movie.findByIdAndDelete(movieId);
  res.status(201).json({ msg: "Movie Removed from the Database !" });
};

module.exports = {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  removeMovie,
};
