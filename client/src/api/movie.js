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
