import React from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

const App = () => {
   return (
      <main className="w-full">
         <Navbar />
         <SignIn />
      </main>
   );
};

export default App;
