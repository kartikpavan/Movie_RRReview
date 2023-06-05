import { useState, useEffect, useContext, createContext } from "react";
import { getIsAuth, userSignIn } from "../api/auth";

const AuthContext = createContext();

const initialAuthState = {
   profile: null,
   isLoggedIn: false,
   isLoading: false,
   error: "",
};

export const AuthContextProvider = ({ children }) => {
   const [authInfo, setAuthInfo] = useState({ ...initialAuthState });

   // Sign in
   const handleSignIn = async (email, password) => {
      setAuthInfo({ ...authInfo, isLoading: true });
      const response = await userSignIn({ email, password });
      if (response.error) {
         return setAuthInfo({ ...authInfo, isLoading: false, error: response.error });
      }
      setAuthInfo({ profile: { ...response.data }, isLoggedIn: true, isLoading: false, error: "" });
      localStorage.setItem("auth-token", response.data.token);
   };

   // checking if user is authenticated and skip Sign In part
   const isUserAuth = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      setAuthInfo({ ...authInfo, isLoading: true });
      const response = await getIsAuth(token);
      if (response.error) {
         return setAuthInfo({ ...authInfo, isLoading: false, error: response.error });
      }
      setAuthInfo({ profile: { ...response.data }, isLoggedIn: true, isLoading: false, error: "" });
   };

   // handle Logout
   useEffect(() => {
      isUserAuth();
   }, []);

   return (
      <AuthContext.Provider value={{ authInfo, handleSignIn, isUserAuth }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => useContext(AuthContext);
