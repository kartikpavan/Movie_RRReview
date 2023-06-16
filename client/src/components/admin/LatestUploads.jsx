import React from "react";

import { FaRegEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import SingleMovieListItem from "./SingleMovieListItem";

const movie = {
  poster:
    "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_.jpg",
  title: "Mission Impossible",
  genres: ["Hollywood", "Action", "Hero"],
  status: "Public",
  _id: "sdsdsaq",
};

const LatestUploads = () => {
  const deleteMovie = () => {};
  const editMovie = () => {};
  const openMovie = () => {};

  return (
    <div className="bg-base-200 w-[80%] p-4 rounded-md">
      <h3 className="leading-6 font-medium text-base-content text-2xl">Latest Uploads</h3>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <SingleMovieListItem
              movie={movie}
              onDelete={deleteMovie}
              onEdit={editMovie}
              onOpen={openMovie}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestUploads;
