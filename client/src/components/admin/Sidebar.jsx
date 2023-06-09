import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import ThemeToggle from "../misc/ThemeToggle";

// Icons
import {
   AiOutlineHome,
   AiOutlineUser,
   AiTwotoneVideoCamera,
   AiOutlineLogout,
} from "react-icons/ai";
import Search from "./Search";

const Sidebar = () => {
   const logout = () => {
      localStorage.removeItem("auth-token");
      window.location.reload();
   };

   return (
      <>
         {/* :LOGO and Theme Toggle */}
         <div className="flex items-center justify-between ">
            <Link to="/" className="flex items-center gap-3">
               <img src={Logo} alt="logo" className="w-16" />
               <p className="hidden md:block md:text-2xl">RRReview</p>
            </Link>
            <ThemeToggle />
         </div>
         {/* Nav Items */}
         <Search />

         <NavItem to="/">
            <AiOutlineHome /> Home
         </NavItem>
         <NavItem to="/actors">
            <AiOutlineUser /> Actors
         </NavItem>
         <NavItem to="/movies">
            <AiTwotoneVideoCamera /> Movies
         </NavItem>
         <button className="btn btn-outline btn-info text-lg my-3">Add Actor</button>
         <button className="btn btn-outline btn-info text-lg my-3">Add Movie</button>

         <button
            onClick={logout}
            className="mt-auto flex items-center justify-between btn btn-error btn-lg btn-outline "
         >
            Admin Log Out
            <AiOutlineLogout size={28} />
         </button>
      </>
   );
};

const NavItem = ({ children, to }) => {
   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            isActive
               ? "flex items-center gap-x-2 text-2xl text-info font-semibold bg-neutral rounded-md p-2 my-3 transition-all ease-in-out duration-200"
               : "flex items-center gap-x-2 text-xl font-semibold  p-2 my-3"
         }
      >
         {children}
      </NavLink>
   );
};

export default Sidebar;
