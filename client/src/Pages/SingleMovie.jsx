import React from "react";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
   const { movieId } = useParams();
   return <main className="max-w-screen-xl mx-auto"></main>;
};

export default SingleMovie;
