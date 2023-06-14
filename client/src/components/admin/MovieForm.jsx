import React, { useState } from "react";
import { TagField, LiveSearch, ProfileModal } from "../../components";
import { useNotificationContext } from "../../context/NotificationContext";

const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

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
    setMovieInfo({ ...movieInfo, director: profile.name }); //! Important change here
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const { title, storyLine, director, writers } = movieInfo;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <main className="flex space-x-1">
          {/* First Section */}
          <section className="w-[60%] h-auto">
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
            <h1 className="text-primary font-semibold ">Cast and Crew</h1>
            {/* Actor */}
            <div>
              <LiveSearch
                results={results}
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
                placeholder="Search Profile"
                onSelect={(result) => console.log(result)}
              />
            </div>
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
                  onClick={() => window.profile_modal.showModal()}
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

        <button type="submit" className="btn mt-2">
          Upload Movie
        </button>
      </form>
      <ProfileModal writers={true} profiles={writers} removeWriter={removeWriter} />
    </>
  );
};

export default MovieForm;
