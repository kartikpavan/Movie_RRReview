import React, { useEffect, useState } from "react";
import { useNotificationContext } from "../../context/notificationContext";
import { getMovies } from "../../api/movie";
import Pagination from "../Pagination";
import { FaExternalLinkAlt, FaRegEdit, FaTrash } from "react-icons/fa";
import SingleMovieListItem from "./SingleMovieListItem";
const AdminMovies = () => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState();
   const [currentPage, setCurrentPage] = useState(0);
   const [reachedEnd, setReachedEnd] = useState(false);

   const nextPage = () => {
      setCurrentPage((prev) => prev + 1);
   };
   const previousPage = () => {
      setCurrentPage((prev) => {
         if (prev < 1) {
            return prev;
         } else {
            return prev - 1;
         }
      });
   };

   const fetchMovies = async (pageNumber) => {
      const { error, data } = await getMovies(pageNumber, 5);
      if (error) return updateNotification("error", error);
      if (!data?.movies.length) {
         setCurrentPage(pageNumber - 1);
         return setReachedEnd(true);
      }
      setMovies(data?.movies);
   };
   useEffect(() => {
      fetchMovies(currentPage);
   }, [currentPage]);

   return (
      <section className="w-full lg:w-[80%]">
         <h3 className="leading-6 font-medium text-base-content text-2xl">All Movies</h3>

         <div className=" overflow-x-auto">
            <table className="table table-sm">
               {/* head */}
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Status</th>
                     <th className="text-center">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {movies?.map((movie) => {
                     return <SingleMovieListItem key={movie._id} movie={movie} />;
                  })}
               </tbody>
            </table>
         </div>
         <div className="w-full flex items-center justify-end -ml-5">
            <div className="join">
               <Pagination
                  nextPage={nextPage}
                  previousPage={previousPage}
                  currentPage={currentPage}
               />
            </div>
         </div>
      </section>
   );
};

// onDelete={deleteMovie}
// onEdit={editMovie}
// onOpen={openMovie}
export default AdminMovies;
