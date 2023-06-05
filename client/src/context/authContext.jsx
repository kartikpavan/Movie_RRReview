import { useState, useEffect, useContext, createContext } from "react";
import { userSignIn } from "../api/auth";

const AuthContext = createContext();

const initialAuthState = {
   profile: null,
   isLoggedIn: false,
   isLoading: false,
   error: "",
};

export const AuthContextProvider = ({ children }) => {
   const [authInfo, setAuthInfo] = useState({ ...initialAuthState });

   const handleSignIn = async (email, password) => {
      setAuthInfo({ ...authInfo, isLoading: true });
      const response = await userSignIn({ email, password });
      if (response.error) {
         return setAuthInfo({ ...authInfo, isLoading: false, error: response.error });
      }
      setAuthInfo({ profile: { ...response.data }, isLoggedIn: true, isLoading: false, error: "" });
      localStorage.setItem("auth-token", response.data.token);
   };

   // handle Logout

   return (
      <AuthContext.Provider value={{ authInfo, handleSignIn }}>{children}</AuthContext.Provider>
   );
};

export const useAuthContext = () => useContext(AuthContext);
