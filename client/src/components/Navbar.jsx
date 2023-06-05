import React from "react";
import { useThemeContext } from "../context/themeContext";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

import { HiMoon, HiSun } from "react-icons/hi2";
import { useAuthContext } from "../context/authContext";

const Navbar = () => {
   const { toggleTheme, theme } = useThemeContext();
   const { authInfo, handleLogOut } = useAuthContext();

   return (
      <nav className="navbar bg-neutral text-neutral-content">
         {/* navbar width*/}
         <div className="w-full lg:w-[80%] xl:w-[70%]  mx-auto">
            <div className="flex items-center justify-between w-full">
               {/* Logo */}
               <NavLink to="/" className="flex items-center gap-3">
                  <img src={Logo} alt="logo" className="w-16" />
                  <p className="hidden md:block md:text-2xl">RRReview</p>
               </NavLink>
               <div className="flex items-center gap-3">
                  {/* Theme toggle */}
                  {theme === "light" ? (
                     <HiMoon
                        className="text-white transition-all duration-300 ease-in-out cursor-pointer w-10 h-10 "
                        onClick={toggleTheme}
                     />
                  ) : (
                     <HiSun
                        className="text-white transition-all duration-300 ease-in-out cursor-pointer w-10 h-10"
                        onClick={toggleTheme}
                     />
                  )}
                  {/* Text Input */}
                  <input
                     type="text"
                     placeholder="Search here..."
                     className="input input-sm md:input-md input-bordered w-full max-w-xs"
                  />
                  {authInfo?.isLoggedIn ? (
                     <button
                        onClick={handleLogOut}
                        className="btn btn-sm md:btn-md btn-error btn-outline"
                     >
                        Logout
                     </button>
                  ) : (
                     <NavLink to="/auth/signIn" className="btn btn-ghost md:text-lg">
                        Login
                     </NavLink>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
