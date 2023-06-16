import React from "react";
import { FaRegEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

const SingleMovieListItem = ({ movie, onDelete, onOpen, onEdit }) => {
  const { poster, title, genres = [], status, _id } = movie;
  return (
    <tr>
      {/* image */}
      <td>
        <div className="flex items-center space-x-3 w-96">
          <div className="avatar">
            <div className="w-32 h-16">
              <img src={poster} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50 space-x-2 space-y-2 ">
              {genres?.map((g, idx) => {
                <div key={idx} className="badge badge-outline">
                  {g}
                </div>;
              })}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="">{status}</span>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-5">
          <FaTrash className="text-error" size={16} />
          <FaRegEdit className="text-warning" size={16} />
          <FaExternalLinkAlt className="text-base-content" size={16} />
        </div>
      </td>
    </tr>
  );
};

export default SingleMovieListItem;
