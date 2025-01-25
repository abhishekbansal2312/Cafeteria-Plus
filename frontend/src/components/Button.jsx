import React from "react";

const ReusableButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className={` px-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-md mb-4`}
    >
      {text}
    </button>
  );
};

export default ReusableButton;
