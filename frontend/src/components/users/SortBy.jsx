import React from "react";

export default function SortBy() {
  return (
    <div className="flex space-x-1 p-4 flex-row">
      <button className="px-4 py-2 border-1 rounded hover:text-black hover:bg-amber-50 transition duration-300">
        Users
      </button>
      <button className="px-4 py-2 border-1 rounded hover:text-black hover:bg-amber-50 transition duration-300">
        Merchants
      </button>
      <button className="px-4 py-2 border-1 rounded hover:text-black hover:bg-amber-50 transition duration-300">
        Admins
      </button>
    </div>
  );
}
