import React, { useState } from "react";
import { TagField, LiveSearch } from "../../components";

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
          <LiveSearch
            results={results}
            renderItem={(result) => {
              const { name, avatar, id } = result;
              return (
                <div key={id} className="flex items-center space-x-2">
                  <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                  <p className="font-semibold">{result.name}</p>
                </div>
              );
            }}
            placeholder="Search Profile"
            onSelect={(result) => console.log(result)}
          />
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
