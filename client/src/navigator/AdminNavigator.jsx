import React from "react";
import { Routes, Route } from "react-router-dom";
import { Notfound } from "../Pages";
import { AdminActors, AdminMovies, Dashboard, Sidebar } from "../components";

const AdminNavigator = () => {
   return (
      <>
         <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
               {/* Page content here */}
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/actors" element={<AdminActors />} />
                  <Route path="/movies" element={<AdminMovies />} />
                  <Route path="*" element={<Notfound />} />
               </Routes>
               <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                  Open drawer
               </label>
            </div>
            <div className="drawer-side">
               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
               <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <Sidebar />
               </ul>
            </div>
         </div>
      </>
   );
};

export default AdminNavigator;
