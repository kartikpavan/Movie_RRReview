import { useState, useEffect, useContext, createContext } from "react";
import { getIsAuth, userSignIn } from "../api/auth";
import { useNotificationContext } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

const initialAuthState = {
   profile: null,
   isLoggedIn: false,
   isLoading: false,
   error: "",
};

export const AuthContextProvider = ({ children }) => {
   const navigate = useNavigate();
   const [authInfo, setAuthInfo] = useState({ ...initialAuthState });
   const { updateNotification } = useNotificationContext();
   console.log(authInfo);
   // Sign in
   async function handleSignIn(email, password) {
      setAuthInfo({ ...authInfo, isLoading: true });
      const response = await userSignIn({ email, password });
      if (response.error) {
         updateNotification("error", response.error);
         return setAuthInfo({ ...authInfo, isLoading: false, error: response.error });
      }
      navigate("/", { replace: true });
      setAuthInfo({ profile: { ...response.data }, isLoggedIn: true, isLoading: false, error: "" });
      localStorage.setItem("auth-token", response.data.token);
      updateNotification("success", `Welcome back ${response?.data?.name}`);
   }

   // checking if user is authenticated and skip Sign In part
   async function isUserAuth() {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      setAuthInfo({ ...authInfo, isLoading: true });
      const { data, error } = await getIsAuth(token);
      if (error) {
         updateNotification("error", error);
         return setAuthInfo({ ...authInfo, isLoading: false, error: error });
      }
      setAuthInfo({
         ...authInfo,
         profile: { ...data },
         isLoggedIn: true,
         isLoading: false,
         error: "",
      });
   }

   // handle Logout
   function handleLogOut() {
      // delete auth token from local storage
      localStorage.removeItem("auth-token");
      navigate("/");
      setAuthInfo({ ...initialAuthState });
   }

   // checking user auth state
   useEffect(() => {
      isUserAuth();
   }, []);

   return (
      <AuthContext.Provider value={{ authInfo, handleSignIn, isUserAuth, handleLogOut }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => useContext(AuthContext);
