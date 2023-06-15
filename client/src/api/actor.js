import { CatchError, getAuthToken } from "../utils/helper";
import client from "./client";

export async function createActor(actorInfo) {
  try {
    const { data } = await client.post("/actors/create", actorInfo, {
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

export async function searchActor(query) {
  try {
    const { data } = await client.get(`/actors/search?name=${query}`, {
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
