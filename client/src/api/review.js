import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

// Add Review
export async function addReview(formData, movieId) {
   console.log(formData);
   try {
      const { data } = await client.post(`/reviews/add/${movieId}`, formData, {
         headers: {
            Authorization: "Bearer " + getAuthToken(),
         },
      });
      return data;
   } catch (error) {
      return CatchError(error);
   }
}
