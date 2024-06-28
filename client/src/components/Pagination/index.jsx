import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({ totalItems, page, setPage }) {
  const totalPages = Math.ceil(totalItems / 10);
  const pages = [];
  const changeCurrentPage = (event) => {
    setPage(event.target.value);
  };

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
 
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 z-10 ms-12 me-12">
      <div className="-mt-px flex w-0 flex-1">
        {totalPages > 1 && page !== 1 && (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </button>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={changeCurrentPage}
            value={pageNumber}
            className={`inline-flex items-center border-t-2 border-transparent ${page === pageNumber ? "border-indigo-500 text-indigo-600" : ""} cursor-pointer px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 z-10`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {}
        {totalPages > 1 && page !== totalPages && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 z-10"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </nav>
  );
}
