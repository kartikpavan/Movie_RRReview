import React from "react";
import { useThemeContext } from "../context/themeContext";

const Navbar = () => {
   const { toggleTheme } = useThemeContext();

   return (
      <div className="navbar bg-neutral text-neutral-content">
         <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
         <button onClick={toggleTheme} className="btn btn-primary">
            Toggle theme
         </button>
      </div>
   );
};

export default Navbar;
