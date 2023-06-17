import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { getActors, searchActor } from "../../api/actor";
import { useNotificationContext } from "../../context/notificationContext";
import { useSearchContext } from "../../context/SearchContext";
import Pagination from "../Pagination";
import UpdateActorModal from "./modals/UpdateActorModal";
import Search from "./Search";
import Loader from "../misc/Loader";

const AdminActors = () => {
   const { updateNotification } = useNotificationContext();
   const { handleSearch, resetSearch, resultNotFound } = useSearchContext();
   const [actors, setActors] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);
   const [reachedEnd, setReachedEnd] = useState(false);
   const [selectedProfile, setSelectedProfile] = useState(null);
   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(false);

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

   // Fetch Actor from DB
   const fetchActors = async (pageNumber) => {
      setLoading(true);
      const { error, data } = await getActors(pageNumber, 9);
      if (error) {
         setLoading(false);
         return updateNotification("error", error);
      }
      if (!data?.actors.length) {
         setLoading(false);
         setCurrentPage(pageNumber - 1);
         return setReachedEnd(true);
      }
      setActors(data?.actors);
      setLoading(false);
   };
   // Fetch Actor when page number changes
   useEffect(() => {
      fetchActors(currentPage);
   }, [currentPage]);

   //Edit Actor
   const handleEditActor = (actor) => {
      window.update_actor_modal.showModal();
      console.log(actor);
      setSelectedProfile(actor);
   };
   // Delete Actor
   const handleDeleteActor = (actor) => {};
   // View Actor information
   const handleViewActor = (actor) => {};

   // Search for actors
   const handleOnSearch = (searchTerm) => {
      handleSearch(searchActor, searchTerm, setResults);
   };
   // Reset Search Button
   const handleOnSearchReset = () => {
      resetSearch();
      setResults([]);
   };

   return (
      <>
         {loading && <Loader />}
         <section className="w-full lg:w-[80%]">
            <div className="flex items-center justify-between  mr-4 ">
               <h3 className="leading-6 font-medium text-base-content text-2xl">All Actors</h3>
               <div className="mt-4 mb-2 w-96">
                  <Search
                     placeholder={"Search Actors"}
                     onSubmit={handleOnSearch}
                     onReset={handleOnSearchReset}
                     showResetIcon={results?.length}
                  />
               </div>
            </div>
            {resultNotFound ? (
               <h1 className="w-full text-center font-semibold text-3xl text-info p-2 my-3 opacity-40">
                  OOPS! No Records Found
               </h1>
            ) : (
               <>
                  <div className="flex flex-wrap gap-5 my-4">
                     {results.length
                        ? results?.map((actor) => {
                             return (
                                <SingleActorProfile
                                   key={actor._id}
                                   actor={actor}
                                   handleEditActor={() => handleEditActor(actor)}
                                   handleDeleteActor={() => handleDeleteActor(actor)}
                                   handleViewActor={() => handleViewActor(actor)}
                                />
                             );
                          })
                        : actors?.map((actor) => {
                             return (
                                <SingleActorProfile
                                   key={actor._id}
                                   actor={actor}
                                   handleEditActor={() => handleEditActor(actor)}
                                   handleDeleteActor={() => handleDeleteActor(actor)}
                                   handleViewActor={() => handleViewActor(actor)}
                                />
                             );
                          })}
                  </div>
                  {!results.length ? (
                     <div className="w-full flex items-center justify-end -ml-5">
                        <div className="join">
                           <Pagination
                              nextPage={nextPage}
                              previousPage={previousPage}
                              currentPage={currentPage}
                           />
                        </div>
                     </div>
                  ) : null}
               </>
            )}
         </section>
         <UpdateActorModal profileToUpdate={selectedProfile} />
      </>
   );
};

const SingleActorProfile = ({ actor, handleDeleteActor, handleEditActor, handleViewActor }) => {
   const { _id, name, gender, description, avatar } = actor;
   const [showOptions, setShowOptions] = useState(false);

   const handleHover = () => {
      setShowOptions(true);
   };
   const handleLeave = () => {
      setShowOptions(false);
   };
   return (
      <div
         className="bg-base-200 p-4 w-96 cursor-pointer relative rounded-md shadow-md"
         onMouseEnter={handleHover}
         onMouseLeave={handleLeave}
      >
         <div className="flex flex-col sm:flex-row gap-2">
            <img src={avatar?.url} alt={name} className="w-44 h-44 object-cover" />
            <div className="flex flex-col">
               <h1 className="text-info font-semibold underline">{name}</h1>
               <p>{description.slice(0, 100)}...</p>
            </div>
         </div>
         {showOptions ? (
            <div className="absolute inset-0 bg-info bg-opacity-10 backdrop-blur-sm flex items-center justify-center gap-x-5 ">
               <button
                  onClick={handleDeleteActor}
                  className="p-2 bg-base-100 rounded-full hover:bg-error"
               >
                  <FaTrash size={18} />
               </button>
               <button
                  onClick={handleEditActor}
                  className="p-2 bg-base-100 rounded-full hover:bg-blue-500"
               >
                  <FaRegEdit size={18} />
               </button>
               <button onClick={handleViewActor}>
                  <FaExternalLinkAlt size={18} />
               </button>
            </div>
         ) : null}
      </div>
   );
};

export default AdminActors;
