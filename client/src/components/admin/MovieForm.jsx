import React, { useState } from "react";
// import TagField from "./misc/TagField";
// import LiveSearch from "./misc/LiveSearch";
import { TagField, LiveSearch } from "../../components";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  langguage: "",
  status: "",
};

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (allTags) => {
    setMovieInfo({ ...movieInfo, tags: allTags });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(movieInfo);
  };

  const { title, storyLine, director } = movieInfo;
  return (
    <form onSubmit={handleSubmit}>
      <main className="flex space-x-1">
        {/* First Section */}
        <section className="w-[60%] h-auto">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
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
              value={storyLine}
              onChange={handleChange}
              name="storyLine"
              className="textarea textarea-bordered h-24 w-full max-w-md"
              placeholder="Storyline"
            ></textarea>
          </div>
          {/* Tag Field */}
          <div>
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <TagField name="tags" onChange={updateTags} />
          </div>
          {/* Live Search for Actors*/}
          <label className="label">
            <span className="label-text">Actor</span>
          </label>
          <LiveSearch />
        </section>
        {/* Second Section */}
        <section className="w-[40%] border border-dashed border-gray-400 h-48"></section>
      </main>

      <button type="submit" className="btn mt-2">
        Upload Movie
      </button>
    </form>
  );
};

export default MovieForm;
