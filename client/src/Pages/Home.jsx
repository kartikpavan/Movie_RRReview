import React from "react";
import { NotVerifiedBanner } from "../components";
import TopRatedMovies from "../components/TopRatedMovies";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
   return (
      <>
         <NotVerifiedBanner />
         <main className="max-w-screen-xl mx-auto">
            {/* Image Slider */}
            <HeroSlider />
            {/* Top Rated movies  */}
            <TopRatedMovies />
            <TopRatedMovies />
         </main>
      </>
   );
};

export default Home;
