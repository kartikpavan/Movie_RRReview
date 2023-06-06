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
import AnimatedRoutes from "./components/animation/AnimatedRoutes";

const App = () => {
   return (
      // width is full and height is set to fit screen
      <main className="w-full h-screen">
         <Navbar />
         <AnimatedRoutes />
      </main>
   );
};

export default App;
