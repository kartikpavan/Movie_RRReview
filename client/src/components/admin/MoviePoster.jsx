import React from "react";

const MoviePoster = ({ accept, name, selectedPoster, onChange }) => {
  return (
    <div className="border border-dashed rounded-md ">
      <input accept={accept} onChange={onChange} id={name} name={name} type="file" hidden />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img src={selectedPoster} alt={name} className="w-full object-contain h-48" />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

const PosterUI = () => {
  return (
    <div className="flex items-center justify-center h-48  cursor-pointer">
      <span className="text-lg font-semibold">Selecte Movie Poster</span>
    </div>
  );
};
export default MoviePoster;
