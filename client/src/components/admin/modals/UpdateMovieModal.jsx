import React, { useState } from "react";
import MovieForm from "../MovieForm";

const UpdateMovieModal = ({ movieToUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleMovieSubmit = () => {};
  return (
    <dialog id="update_movie_modal" className="modal">
      {/* //! later make this form tag  */}
      <div method="dialog" className="modal-box w-11/12 max-w-4xl">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
        </form>
        <MovieForm
          onSubmit={handleMovieSubmit}
          isLoading={isLoading}
          movieToUpdate={movieToUpdate}
        />
      </div>
    </dialog>
  );
};

export default UpdateMovieModal;
