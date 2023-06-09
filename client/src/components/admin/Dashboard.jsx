import React from "react";
import { ActorModal, MovieModal } from "../misc/Modals";

const Dashboard = () => {
   return (
      <main className="w-full">
         {/* Modals */}
         <ActorModal />
         <MovieModal />
      </main>
   );
};

export default Dashboard;
