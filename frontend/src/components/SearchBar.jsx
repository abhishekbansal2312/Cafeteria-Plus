import React, { useState, useEffect } from "react";

const SearchBar = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState(search);
  const maxWords = 5;
  const delay = 1000;

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, setSearch]);

  const handleChange = (e) => {
    const words = e.target.value.split(" ").slice(0, maxWords).join(" ");
    setInputValue(words);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border px-4 py-2 rounded-md"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
