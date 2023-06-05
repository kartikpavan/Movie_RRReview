import client from "./client";

// REGISTER
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

// VERIFY EMAIL
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

// SIGN IN
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

// IS USER AUTHENTICATED
export async function getIsAuth(token) {
   try {
      const { data } = await client.get("/users/is-auth", {
         headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
      });
      return data;
   } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
      return { error: error.message || error };
   }
}
