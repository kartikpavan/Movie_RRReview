import React from "react";
import { NotVerifiedBanner } from "../components";

const Home = () => {
   return (
      <>
         <NotVerifiedBanner />
         <section className="text-2xl text-secondary">HOME</section>
      </>
   );
};

export default Home;
