import React from "react";

const ReusableButton = ({
  onClick,
  text,
  disabled = false,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded text-white ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-700"
    } ${className}`}
  >
    {text}
  </button>
);

export default ReusableButton;
