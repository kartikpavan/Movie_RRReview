import React from "react";

const Pagination = ({ previousPage, nextPage, currentPage }) => {
   return (
      <div className="join">
         <button onClick={previousPage} className="join-item btn btn-xs btn-info btn-outline">
            Prev
         </button>
         <button className="join-item btn btn-xs btn-ghost ">Page {currentPage + 1}</button>
         <button onClick={nextPage} className="join-item btn btn-xs btn-info btn-outline">
            Next
         </button>
      </div>
   );
};

export default Pagination;
