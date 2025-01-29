import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const buttonClass = "px-4 py-2 mx-1 rounded";
  const disabledButtonClass = " cursor-not-allowed text-gray-400";

  return (
    <div className="flex justify-center mt-4 ">
      <button
        className={`${buttonClass} ${
          currentPage === 1 ? disabledButtonClass : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>
      <button
        className={`${buttonClass} ${
          currentPage === totalPages ? disabledButtonClass : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
