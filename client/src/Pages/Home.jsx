import React from "react";
import { NotVerifiedBanner } from "../components";
import TopRatedMovies from "../components/TopRatedMovies";
import HeroSlider from "../components/HeroSlider";
import TopRatedTvSeries from "../components/TopRatedTvSeries";
import TestUserBanner from "../components/misc/TestUserBanner";

const Home = () => {
   return (
      <>
         <NotVerifiedBanner />
         <TestUserBanner />
         <main className="max-w-screen-xl mx-auto">
            {/* Image Slider */}
            <HeroSlider />
            {/* Top Rated movies  */}
            <TopRatedMovies />
            <TopRatedTvSeries />
         </main>
      </>
   );
};

export default Home;
