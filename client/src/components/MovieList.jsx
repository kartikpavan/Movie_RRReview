import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieList = ({ label, movies = [] }) => {
   const trimTitle = (title) => {
      if (title.length < 20) return title;
      return title.slice(0, 20) + "..";
   };
   if (!movies.length) return null;
   return (
      <>
         <h1 className="text-xl font-semibold mt-8 mb-2 px-2">{label}</h1>
         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2">
            {movies?.map((movie, idx) => {
               return (
                  <Link key={movie._id} to={`movie/${movie._id}`}>
                     <img
                        src={movie.poster || <Skeleton />}
                        alt={movie.title}
                        className="h-72 object- rounded-md"
                     />

                     <h1 className="font-semibold">{trimTitle(movie.title) || <Skeleton />}</h1>
                     <p className="flex items-center space-x-1">
                        {movie.reviews?.ratingAvg ? (
                           <span className="text-yellow-500">
                              {movie.reviews?.ratingAvg || <Skeleton />}
                           </span>
                        ) : (
                           <span className="text-yellow-500">0</span>
                        )}
                        <AiFillStar className="text-yellow-500" size={18} />
                     </p>
                  </Link>
               );
            })}
         </section>
      </>
   );
};

export default MovieList;
