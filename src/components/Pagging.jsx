import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    if (totalPages <= 6) {
      // Show all pages if total pages are 6 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        // Show first few pages and '...'
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - maxVisiblePages) {
        // Show last few pages and '...'
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show current, previous, next and '...'
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center my-4 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500"
        }`}
      >
        ←
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500"
        }`}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
