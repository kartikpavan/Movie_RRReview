import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

import { useAuthContext } from "../context/authContext";
import { useNotificationContext } from "../context/NotificationContext";
import { ThemeToggle } from "../components";

const Navbar = () => {
   const { authInfo, handleLogOut } = useAuthContext();
   const { updateNotification } = useNotificationContext();

   const logOut = () => {
      handleLogOut();
      updateNotification("info", "Logged out Successfully");
   };

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
                  <ThemeToggle />
                  {/* Text Input */}
                  <input
                     type="text"
                     placeholder="Search here..."
                     className="input input-sm md:input-md input-bordered w-full max-w-xs"
                  />
                  {authInfo?.isLoggedIn ? (
                     <button
                        onClick={logOut}
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
