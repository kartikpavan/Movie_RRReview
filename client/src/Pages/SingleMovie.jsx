import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../api/movie";
import { useNotificationContext } from "../context/NotificationContext";
import Loader from "../components/misc/Loader";
import RatingStar from "../components/RatingStar";
import RelatedMovies from "../components/RelatedMovies";
import { useAuthContext } from "../context/authContext";

const SingleMovie = () => {
   const { updateNotification } = useNotificationContext();
   const { authInfo } = useAuthContext();
   const navigate = useNavigate();
   const { movieId } = useParams();
   const [loading, setLoading] = useState(false);
   const [movie, setMovie] = useState({});

   const fetchSingleMovie = async () => {
      setLoading(true);
      const { data, error } = await getSingleMovie(movieId);
      if (error) {
         setLoading(false);
         return updateNotification("error", error);
      }
      setMovie(data);
      setLoading(false);
   };

   useEffect(() => {
      if (movieId) fetchSingleMovie();
   }, [movieId]);

   const handleRateMovie = () => {
      if (!authInfo.isLoggedIn) {
         return navigate("/auth/signIn");
      }
   };

   const {
      title,
      poster,
      trailer,
      reviews = {},
      _id,
      storyLine,
      director = {},
      writers = [],
      cast = [],
      language,
      releaseDate,
      type,
      genres = [],
   } = movie;
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <main className="max-w-screen-xl mx-auto p-2 ">
               {/* Hero Section */}
               <div>
                  {/* Movie Trailer */}
                  <video poster={poster} controls src={trailer} className="w-full"></video>
               </div>
               <div className="flex justify-between items-center">
                  {/* title */}
                  <h1 className="text-4xl font-semibold text-primary py-3">{title}</h1>
                  {/* Reviews */}
                  <div className="flex flex-col items-end">
                     <RatingStar rating={reviews.ratingAvg} />
                     <Link to={`/movie/reviews/` + _id} className="link link-primary link-hover">
                        {reviews.reviewCount} Reviews
                     </Link>
                     <button className="link link-primary " type="button" onClick={handleRateMovie}>
                        Rate the Movie
                     </button>
                  </div>
               </div>
               {/* Movie Details */}
               <div className="space-y-3">
                  {/* Storyline */}
                  <p className="text-gray-500">{storyLine}</p>
                  {/* Language */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Language :</p>
                     <p className="text-primary hover:underline cursor-pointer">{language}</p>
                  </div>
                  {/* Release Date */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Release Date :</p>
                     <p className="text-primary hover:underline cursor-pointer">
                        {releaseDate?.split("T")[0]}
                     </p>
                  </div>
                  {/* Type  */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Type :</p>
                     <p className="text-primary hover:underline cursor-pointer">{type}</p>
                  </div>
                  {/* Genres */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Genres : </p>
                     {genres?.map((g) => {
                        return (
                           <span
                              className="space-x-3 text-primary hover:underline cursor-pointer"
                              key={g}
                           >
                              {g}
                           </span>
                        );
                     })}
                  </div>
                  {/* Director */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Director:</p>
                     <p className="text-primary hover:underline cursor-pointer">{director.name}</p>
                  </div>
                  {/* Writers */}
                  <div className="flex space-x-2">
                     <p className="text-gray-500">Writers:</p>
                     <div className="space-x-2">
                        <div className="text-primary hover:underline">
                           {writers.map((w) => {
                              return (
                                 <p
                                    key={w._id}
                                    className="text-primary hover:underline cursor-pointer"
                                 >
                                    {w.name}
                                 </p>
                              );
                           })}
                        </div>
                     </div>
                  </div>
                  {/* Cast */}
                  <p className="text-gray-500">Cast:</p>
                  <div className="space-x-2 flex">
                     {cast?.map((c) => {
                        return (
                           <div
                              key={c.profile?.actorId}
                              className="flex flex-col items-center gap-y-1 cursor-pointer hover:bg-base-300 rounded-md p-1"
                           >
                              <img
                                 src={c.profile?.avatar}
                                 alt={c.profile?.name}
                                 className="h-24 w-24 rounded-full "
                              />
                              <p className="text-primary font-semibold text-center">
                                 {c.profile?.name}
                              </p>
                              <p className="text-gray-500 ">{c.roleAs}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
               {/* Rendering related movies */}
               <RelatedMovies movieId={movieId} />
            </main>
         )}
      </>
   );
};

export default SingleMovie;
