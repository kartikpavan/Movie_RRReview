import client from "./client";

export async function createUser(userInfo) {
   try {
      const { data } = await client.post("/users/create-user", userInfo);
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { error: error.message || error };
   }
}

export async function verifyUserEmail(userInfo) {
   try {
      const { data } = await client.post("/users/verify-email", userInfo);
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { error: error.message || error };
   }
}

export async function userSignIn(userInfo) {
   try {
      const { data } = await client.post("/users/sign-in", userInfo);
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { error: error.message || error };
   }
}
