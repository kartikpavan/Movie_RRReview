import React, { useState } from "react";
import { TagField, LiveSearch, CastField, WritersModal, CastModal } from "../../components";
import { useNotificationContext } from "../../context/NotificationContext";
import { results } from "../../data/data";

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
  const { updateNotification } = useNotificationContext();
  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (allTags) => {
    setMovieInfo({ ...movieInfo, tags: allTags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile }); //! Important change here
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    // Checking if the writer is already present inside the writer array
    for (let writer of writers) {
      if (writer.id === profile.id)
        return updateNotification("warning", "Writer is already selected");
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const removeWriter = (id) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter((w) => w.id !== id);
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const updateCast = (castInfo) => {
    setMovieInfo({ ...movieInfo, cast: [...movieInfo.cast, castInfo] });
  };
  const removeActor = (id) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== id);
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const { title, storyLine, director, writers, cast } = movieInfo;
  return (
    <>
      <form>
        <main className="flex gap-x-2 gap-y-4 flex-col sm:flex-row ">
          {/* First Section */}
          <section className="w-full sm:w-[60%] h-auto">
            {/* Title */}
            <div>
              <label className="label">
                <span className="label-text text-primary font-semibold ">Title</span>
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
                <span className="label-text text-primary font-semibold ">Storyline</span>
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
            <div className="mb-2">
              <label className="label">
                <span className="label-text text-primary font-semibold ">Tags</span>
              </label>
              <TagField name="tags" onChange={updateTags} />
            </div>

            {/* Cast and Crew */}
            <h1 className="text-primary font-semibold ">
              Cast and Crew <span className="badge badge-sm">{cast?.length}</span>
              <span
                className="label-text-alt link mx-2"
                onClick={() => window.cast_modal.showModal()}
              >
                View All
              </span>
            </h1>

            {/* Cast */}
            <CastField onSubmit={updateCast} />
            {/* Director */}
            <div>
              <label className="label">
                <span className="label-text text-primary font-semibold">Director</span>
              </label>
              <LiveSearch
                name="director"
                placeholder="Search Profile"
                value={director.name}
                results={results}
                onSelect={updateDirector}
                renderItem={(result) => {
                  const { name, avatar, id } = result;
                  return (
                    <div key={id} className="flex items-center space-x-2">
                      <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <p className="font-semibold">{result.name}</p>
                    </div>
                  );
                }}
              />
            </div>
            {/* Writers */}
            <div>
              <label className="label">
                <span className="label-text text-primary font-semibold">
                  Writers <span className="badge badge-sm">{writers?.length}</span>
                </span>
                <span
                  className="label-text-alt link mx-14"
                  onClick={() => window.writers_modal.showModal()}
                >
                  View All
                </span>
              </label>
              <LiveSearch
                name="writers"
                placeholder="Search Profile"
                results={results}
                onSelect={updateWriters}
                renderItem={(result) => {
                  const { name, avatar, id } = result;
                  return (
                    <div key={id} className="flex items-center space-x-2">
                      <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <p className="font-semibold">{result.name}</p>
                    </div>
                  );
                }}
              />
            </div>
          </section>
          {/* Second Section */}
          <section className="w-[40%] border border-dashed border-gray-400 h-48"></section>
        </main>

        <SubmitFormButton isLoading={false} onClick={handleSubmit} />
      </form>
      <WritersModal profiles={writers} removeWriter={removeWriter} />
      <CastModal profiles={cast} removeActor={removeActor} />
    </>
  );
};

const SubmitFormButton = ({ isLoading, onClick }) => {
  return (
    <>
      <button className="btn mt-4 btn-wide" type="button" onClick={onClick}>
        {isLoading && (
          <>
            <span className="loading loading-spinner"></span>
            Submitting Form
          </>
        )}
        Submit
      </button>
    </>
  );
};

export default MovieForm;
