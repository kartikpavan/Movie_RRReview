import { BiCategoryAlt } from "react-icons/bi";
const GenreSelector = ({ totalGenresSelected }) => {
  return (
    <div className="mt-4">
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">{totalGenresSelected} selected</span>
        <button
          className="btn btn-neutral"
          onClick={() => window.genre_modal.showModal()}
          type="button"
        >
          <BiCategoryAlt />
          Select Genres
        </button>
      </div>
    </div>
  );
};

export default GenreSelector;
