import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/10 dark:bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg min-w-[800px] max-h-[90vh] max-w-md m-auto overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-normal">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
