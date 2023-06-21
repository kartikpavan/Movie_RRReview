import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../api/movie";
import { useNotificationContext } from "../context/NotificationContext";
import MovieList from "./MovieList";

const TopRatedMovies = () => {
   const { updateNotification } = useNotificationContext();
   const [movies, setMovies] = useState([]);

   const fetchTopRatedMovies = async (signal) => {
      const { data, error } = await getTopRatedMovies("Film", signal);
      if (error) return updateNotification("error", error);
      setMovies(data);
   };

   useEffect(() => {
      const controller = new AbortController();
      fetchTopRatedMovies(controller.signal);
      return () => controller.abort();
   }, []);

   return (
      <>
         <MovieList movies={movies} label={"Top Rated (Movies)"} />
      </>
   );
};

export default TopRatedMovies;
