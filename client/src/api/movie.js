import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

// Upload Movie Trailer only
export async function uploadMovieTrailer(formData) {
   try {
      const { data } = await client.post("/movies/upload-trailer", formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Upload Movie
export async function uploadMovie(formData) {
   try {
      const { data } = await client.post("/movies/create", formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Fetch Movie for admin UI
export async function getMovies(pageNumber, limit) {
   try {
      const { data } = await client.get(`/movies/get-movies?pageNo=${pageNumber}&limit=${limit}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// fetch movie for update Form
export async function getMovieForUpdateForm(movieId) {
   try {
      const { data } = await client.get(`/movies/get-movie-for-updateform/${movieId}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

// Search movies
export async function searchMoviesForAdmin(query) {
   try {
      const { data } = await client.get(`/movies/search?title=${query}`, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
            "Content-Type": "multipart/form-data",
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

//! USER

// Top rated Movies
export async function getTopRatedMovies(type) {
   try {
      let endpoint = "/movies/top-rated-movies";
      if (type) endpoint += "?type" + type;
      const { data } = await client.get(endpoint);
      return data;
   } catch (error) {
      return CatchError(error);
   }
}

//
export async function getLatestMovies() {
   try {
      const { data } = await client.get("/movies/latest-movies");
      return data;
   } catch (error) {
      return CatchError(error);
   }
}
