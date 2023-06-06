import React from "react";
import NotVerifiedBanner from "../components/NotVerifiedBanner";

import { motion } from "framer-motion";

const Home = () => {
   return (
      <>
         <NotVerifiedBanner />
         <motion.section
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: -window.innerWidth }}
            className="text-2xl text-secondary"
         >
            HOME
         </motion.section>
      </>
   );
};

export default Home;
