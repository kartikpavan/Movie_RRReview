import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {
   Home,
   SignIn,
   SignUp,
   EmailVerification,
   ForgotPassword,
   ResetPassword,
   Notfound,
} from "./Pages";

import { Routes, Route } from "react-router-dom";
import ProtectedAuth from "./components/ProtectedAuth";

const App = () => {
   return (
      // width is full and height is set to fit screen
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
            <Route
               path="/auth/email-verification"
               element={
                  <ProtectedAuth>
                     <EmailVerification />
                  </ProtectedAuth>
               }
            />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Notfound />} />
         </Routes>
      </main>
   );
};

export default App;
