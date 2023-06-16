import React, { useState } from "react";
import { FaRegEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

const AdminActors = () => {
  return (
    <section className="w-full lg:w-[70%] ">
      <h3 className="leading-6 font-medium text-base-content text-2xl">All Actors</h3>
      <div className="flex flex-wrap gap-5 my-4">
        <SingleActorProfile />
        <SingleActorProfile />
        <SingleActorProfile />
        <SingleActorProfile />
        <SingleActorProfile />
        <SingleActorProfile />
        <SingleActorProfile />
      </div>
    </section>
  );
};

const SingleActorProfile = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleHover = () => {
    setShowOptions(true);
  };
  const handleLeave = () => {
    setShowOptions(false);
  };
  return (
    <div
      className="bg-base-200 p-4 w-96 cursor-pointer relative rounded-md shadow-md"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <img
          src="https://static.javatpoint.com/top10-technologies/images/top-10-south-indian-actors1.png"
          alt=""
          className="w-44 h-44 object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-info font-semibold underline">Ram Charan</h1>
          <p>
            Konidela Ram Charan is an Indian actor, producer, and entrepreneur who primarily works
            in Telugu films.
          </p>
        </div>
      </div>
      {showOptions ? (
        <div className="absolute inset-0 bg-info bg-opacity-10 backdrop-blur-sm flex items-center justify-center gap-x-5 ">
          <button className="p-2 bg-base-100 rounded-full hover:bg-error">
            <FaTrash size={18} />
          </button>
          <button className="p-2 bg-base-100 rounded-full hover:bg-blue-500">
            <FaRegEdit size={18} />
          </button>
          <button>
            <FaExternalLinkAlt size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AdminActors;
