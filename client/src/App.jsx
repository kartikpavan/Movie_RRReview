import React, { useEffect } from "react";
import Navbar from "./components/Navbar";

import AnimatedRoutes from "./components/animation/AnimatedRoutes";

const App = () => {
   return (
      <main className="w-full h-screen">
         <Navbar />
         <AnimatedRoutes />
      </main>
   );
};

export default App;
