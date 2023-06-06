import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedAuth from "../ProtectedAuth";
import {
   EmailVerification,
   ForgotPassword,
   Home,
   Notfound,
   ResetPassword,
   SignIn,
   SignUp,
} from "../../Pages";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
   const location = useLocation();

   return (
      <AnimatePresence>
         <Routes location={location} key={location.pathname}>
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
      </AnimatePresence>
   );
};

export default AnimatedRoutes;
