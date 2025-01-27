import React from "react";
import Button from "../Button";

export default function PaginateUsers({ fetchUsers, page, totalPages }) {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        className={`px-4 py-2 rounded-lg font-medium transition ${
          page <= 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => fetchUsers(page - 1)}
        disabled={page <= 1}
      >
        &lt;
      </button>

      <span className="mx-4 text-lg font-semibold ">
        Page {page} of {totalPages}
      </span>

      <button
        className={`px-4 py-2 rounded-lg font-medium transition ${
          page >= totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => fetchUsers(page + 1)}
        disabled={page >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
