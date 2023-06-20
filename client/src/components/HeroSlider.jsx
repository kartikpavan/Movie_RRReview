import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getLatestMovies } from "../api/movie";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

let currentIndex = 0;
let timer;

const HeroSlider = () => {
   const [movies, setMovies] = useState([]);
   const [slide, setSlide] = useState({});
   const [clonedSlide, setClonedSlide] = useState({});
   const [visible, setVisible] = useState(false);

   const slideRef = useRef();
   const clonedSlideRef = useRef();

   const fetchLatestMovies = async () => {
      const { data, error } = await getLatestMovies();
      if (error) return console.log(error);
      setMovies(data);
      setSlide(data[0]);
   };

   // next slide
   const handleNextClick = () => {
      pauseSlideShow();
      setClonedSlide(movies[currentIndex]); // storing previous slide
      currentIndex = (currentIndex + 1) % movies.length;
      setSlide(movies[currentIndex]); // next slide

      clonedSlideRef.current.classList.add("slide-out-to-left");
      slideRef.current.classList.add("slide-in-from-right");
   };

   // previouse slide
   const handlePreviousClick = () => {
      pauseSlideShow();
      setClonedSlide(movies[currentIndex]); // storing previous slide
      currentIndex = (currentIndex + movies.length - 1) % movies.length;
      setSlide(movies[currentIndex]); // next slide

      clonedSlideRef.current.classList.add("slide-out-to-right");
      slideRef.current.classList.add("slide-in-from-left");
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
      // timer = setInterval(() => {
      //    handleNextClick();
      // }, 5000);
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
      fetchLatestMovies();
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
   }, []);

   useEffect(() => {
      if (movies.length) startSlideShow();
      return () => pauseSlideShow();
   }, [movies.length, visible]);

   return (
      <main className="w-full flex mt-2">
         {/* Slide Show Section */}
         <section className="w-4/5 aspect-video relative overflow-hidden rounded-l-lg">
            {/* Current Slide */}
            <Slide src={slide.poster} title={slide.title} ref={slideRef} />
            {/* CLones Slide */}
            <Slide
               src={clonedSlide.poster}
               title={clonedSlide.title}
               ref={clonedSlideRef}
               onAnimationEnd={handleAnimationEnd}
               className={"absolute inset-0"}
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between  px-2">
               <button type="button" className="btn btn-ghost" onClick={handlePreviousClick}>
                  <MdKeyboardArrowLeft size={30} />
               </button>
               <button type="button" className="btn btn-ghost" onClick={handleNextClick}>
                  <MdKeyboardArrowRight size={30} />
               </button>
            </div>
         </section>
         {/* Up Next Section */}
         <section className="w-1/5 bg-pink-500 rounded-r-lg"></section>
      </main>
   );
};

const Slide = forwardRef((props, ref) => {
   const { src, title, className = "", ...rest } = props;
   return (
      <div ref={ref} className={"relative cursor-pointer" + className} {...rest}>
         <img src={src} className="aspect-video object-contain" />
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black"></div>
         <p className="absolute inset-x-0 bottom-0 text-white font-semibold text-3xl p-2">
            {title}
         </p>
      </div>
   );
});

export default HeroSlider;
