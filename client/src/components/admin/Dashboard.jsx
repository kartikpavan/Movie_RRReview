import React, { useState } from "react";
import Stats from "./Stats";
import LatestUploads from "./LatestUploads";

const Dashboard = () => {
  return (
    <main className="w-full lg:w-[70%]">
      {/* Stats */}
      {/* <section className="w-full grid grid-cols-1 md:grid-cols-3">
        <div className="max-w-32"></div>
      </section> */}
      <Stats />
      <LatestUploads />
    </main>
  );
};

export default Dashboard;
