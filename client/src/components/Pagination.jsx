const Pagination = ({ previousPage, nextPage, currentPage }) => {
  return (
    <div className="w-full flex items-center justify-end -ml-5">
      <div className="join">
        <button onClick={previousPage} className="join-item btn btn-xs btn-info btn-outline">
          Prev
        </button>
        <button className="join-item btn btn-xs btn-ghost ">Page {currentPage + 1}</button>
        <button onClick={nextPage} className="join-item btn btn-xs btn-info btn-outline">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
