import React from "react";

const ReusableButton = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
  >
    {text}
  </button>
);

export default ReusableButton;
