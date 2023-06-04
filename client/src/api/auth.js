import client from "./client";

export async function createUser(userInfo) {
   try {
      const { data } = await client.post("/users/create-user", userInfo);
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { msg: error.message || error };
   }
}

export async function verifyUserEmail(userInfo) {
   try {
      const { data } = await client.post("/users/verify-email", userInfo);
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { msg: error.message || error };
   }
}
