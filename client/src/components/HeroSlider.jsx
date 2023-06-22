import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getLatestMovies } from "../api/movie";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

import HeroSliderSkeleton from "./Skeletons/HeroSliderSkeleton";

let currentIndex = 0;
let timer;

const HeroSlider = () => {
   const [movies, setMovies] = useState([]);
   const [slide, setSlide] = useState({});
   const [clonedSlide, setClonedSlide] = useState({});
   const [visible, setVisible] = useState(false);
   const [upNext, setUpNext] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const slideRef = useRef();
   const clonedSlideRef = useRef();

   const fetchLatestMovies = async (signal) => {
      setIsLoading(true);
      const { data, error } = await getLatestMovies(signal);
      if (error) {
         setIsLoading(false);
         return console.log(error);
      }
      setMovies(data);
      setSlide(data[0]);
      setIsLoading(false); //!
   };

   const handleUpNextSection = (idx) => {
      if (!movies.length) return;
      const upNextCount = idx + 1;
      const end = upNextCount + 2;
      let newSlides = [...movies];
      newSlides = newSlides.slice(idx + 1, movies.length);
      if (!newSlides.length) {
         newSlides = [...movies].slice(0, 3);
      }
      setUpNext([...newSlides]);
   };

   // next slide
   const handleNextClick = () => {
      pauseSlideShow();
      setClonedSlide(movies[currentIndex]); // storing previous slide
      currentIndex = (currentIndex + 1) % movies.length;
      setSlide(movies[currentIndex]); // next slide

      clonedSlideRef.current.classList.add("slide-out-to-left");
      slideRef.current.classList.add("slide-in-from-right");
      handleUpNextSection(currentIndex);
   };

   // previouse slide
   const handlePreviousClick = () => {
      pauseSlideShow();
      setClonedSlide(movies[currentIndex]); // storing previous slide
      currentIndex = (currentIndex + movies.length - 1) % movies.length;
      setSlide(movies[currentIndex]); // next slide

      clonedSlideRef.current.classList.add("slide-out-to-right");
      slideRef.current.classList.add("slide-in-from-left");
      handleUpNextSection(currentIndex);
   };

   // removing all animation classes
   const handleAnimationEnd = () => {
      const classes = [
         "slide-in-from-right",
         "slide-in-from-left",
         "slide-out-to-left",
         "slide-out-to-right",
      ];

      slideRef.current.classList.remove(...classes);
      clonedSlideRef.current.classList.remove(...classes);

      setClonedSlide({});
      startSlideShow();
   };

   // slide show start() function
   const startSlideShow = () => {
      if (!isLoading) {
         timer = setInterval(handleNextClick, 5000);
      }
   };

   // slide show pause() function
   const pauseSlideShow = () => clearInterval(timer);

   // Checking the focus of the web app
   const handleVisibilityChange = () => {
      console.log(document.visibilityState);
      if (document.visibilityState === "hidden") setVisible(false);
      if (document.visibilityState === "visible") setVisible(true);
   };

   useEffect(() => {
      const controller = new AbortController();
      fetchLatestMovies(controller.signal);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
         controller.abort();
         pauseSlideShow();
         document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
   }, []);

   useEffect(() => {
      if (movies.length) {
         startSlideShow();
         handleUpNextSection(currentIndex);
      }
      return () => pauseSlideShow();
   }, [movies.length, visible]);

   return (
      <>
         {isLoading ? (
            <HeroSliderSkeleton />
         ) : (
            <main className="w-full flex flex-col md:flex-row mt-2">
               {/* Slide Show Section */}
               <section className="md:w-4/5 aspect-video relative overflow-hidden rounded-l-lg">
                  <Slide
                     movieId={slide._id}
                     src={slide.poster}
                     title={slide.title}
                     ref={slideRef}
                  />
                  <Slide
                     movieId={slide._id}
                     src={clonedSlide.poster}
                     title={clonedSlide.title}
                     ref={clonedSlideRef}
                     onAnimationEnd={handleAnimationEnd}
                     className={"absolute inset-0"}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between  px-2">
                     <button
                        type="button"
                        className="btn btn-primary btn-xs"
                        onClick={handlePreviousClick}
                     >
                        <MdKeyboardArrowLeft className="text-xl" />
                     </button>
                     <button
                        type="button"
                        className="btn btn-primary btn-xs"
                        onClick={handleNextClick}
                     >
                        <MdKeyboardArrowRight className="text-xl" />
                     </button>
                  </div>
               </section>
               {/* Up Next Section */}
               <section className="md:w-1/5 flex flex-col rounded-r-lg bg-base-200">
                  <h1 className="font-semibold text-md  mb-1 md:text-2xl px-3 md:pb-3">Up Next</h1>
                  <div className="md:space-y-3 px-3 flex items-baseline space-x-2 md:space-x-0 overflow-hidden md:block">
                     {upNext.map((item, idx) => {
                        return (
                           <img
                              key={item._id}
                              src={item.poster}
                              className="object-cover h-20 md:h-40 aspect-video rounded-md"
                           />
                        );
                     })}
                  </div>
               </section>
            </main>
         )}
      </>
   );
};

const Slide = forwardRef((props, ref) => {
   const { movieId, src, title, className = "", ...rest } = props;
   return (
      <Link
         to={`/movie/${movieId}`}
         ref={ref}
         className={"relative cursor-pointer block" + className}
         {...rest}
      >
         <img src={src} className="aspect-video object-contain" />
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black"></div>
         <p className="absolute inset-x-0 bottom-0 text-white font-semibold text-xl md:text-3xl p-2">
            {title}
         </p>
      </Link>
   );
});

export default HeroSlider;
