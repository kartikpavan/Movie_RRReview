import React from "react";
import TagField from "./misc/TagField";

const MovieForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex space-x-1">
      {/* First Section */}
      <section className="w-[60%] h-auto">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Title </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-md"
          />
        </div>
        {/* Movie Description */}
        <div>
          <label className="label">
            <span className="label-text">Storyline</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full max-w-md"
            placeholder="Storyline"
          ></textarea>
        </div>
        {/* Tag Field */}
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <TagField />
      </section>
      {/* Second Section */}
      <section className="w-[40%] border border-dashed border-gray-400 h-48"></section>
    </form>
  );
};

export default MovieForm;
