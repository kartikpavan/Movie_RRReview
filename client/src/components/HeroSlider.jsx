import React, { useEffect, useRef, useState } from "react";
import { getLatestMovies } from "../api/movie";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

let count = 0;

const HeroSlider = () => {
   const [movies, setMovies] = useState([]);
   const [slide, setSlide] = useState({});
   const [currentIndex, setCurrentIndex] = useState(0);

   const slideRef = useRef();
   const fetchLatestMovies = async () => {
      const { data, error } = await getLatestMovies();
      if (error) return console.log(error);
      setMovies([...data]);
      setSlide(data[0]);
   };

   useEffect(() => {
      fetchLatestMovies();
   }, []);

   const handleNextClick = () => {
      count = (Number(count) + 1) % Number(movies.length);
      setSlide(movies[count]);
      setCurrentIndex(count);
      slideRef.current.classList.add("slide-in-from-right");
   };
   const handlePreviousClick = () => {
      setCurrentIndex((prev) => prev - 1);
   };

   const handleAnimationEnd = () => {
      slideRef.current.classList.remove("slide-in-from-right");
   };

   return (
      <main className="w-full flex mt-2">
         {/* Slide Show Section */}
         <section className="w-4/5 aspect-video relative overflow-hidden">
            <img
               onAnimationEnd={handleAnimationEnd}
               ref={slideRef}
               src={slide?.poster}
               alt="name"
               className="aspect-video object-contain"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
               <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handlePreviousClick}
               >
                  <MdKeyboardArrowLeft size={30} />
               </button>
               <button type="button" className="btn btn-outline btn-sm" onClick={handleNextClick}>
                  <MdKeyboardArrowRight size={30} />
               </button>
            </div>
         </section>
         {/* Up Next Section */}
         <section className="w-1/5 bg-pink-500 "></section>
      </main>
   );
};

export default HeroSlider;
