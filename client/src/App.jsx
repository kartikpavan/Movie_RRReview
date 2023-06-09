import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import { useAuthContext } from "./context/authContext";
import {
   EmailVerification,
   ForgotPassword,
   Home,
   Notfound,
   ResetPassword,
   SignIn,
   SignUp,
} from "./Pages";
import AdminNavigator from "./navigator/AdminNavigator";
import { ProtectedAuth } from "./components";

const App = () => {
   const { authInfo } = useAuthContext();
   const isAdmin = authInfo.profile?.role === "admin";

   if (isAdmin) return <AdminNavigator />;

   return (
      <main className="w-full h-screen">
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            {/* Auth Routes */}
            <Route
               path="/auth/signIn"
               element={
                  <ProtectedAuth>
                     <SignIn />
                  </ProtectedAuth>
               }
            />
            <Route
               path="/auth/signUp"
               element={
                  <ProtectedAuth>
                     <SignUp />
                  </ProtectedAuth>
               }
            />
            <Route path="/auth/email-verification" element={<EmailVerification />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Notfound />} />
         </Routes>
      </main>
   );
};

export default App;
