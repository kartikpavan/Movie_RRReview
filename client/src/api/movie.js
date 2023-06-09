import client from "./client";

// Upload Movie Trailer only

export async function uploadMovieTrailer(formData) {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/movies/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
}
