import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="border px-4 py-2 rounded-md"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
