import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const { theme } = useContext(ThemeContext);

  const modalBgClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  const buttonTextClass =
    theme === "dark"
      ? "text-gray-400 hover:text-gray-300"
      : "text-gray-500 hover:text-gray-700";
  const overlayClass = theme === "dark" ? "bg-black/50" : "bg-black/10";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${overlayClass} backdrop-blur-sm z-50`}
      onClick={onClose}
    >
      <div
        className={`p-6 rounded-lg shadow-lg min-w-[800px] max-h-[90vh] max-w-md m-auto overflow-auto ${modalBgClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-normal">{title}</h2>
          <button
            onClick={onClose}
            className={`hover:text-gray-700 dark:hover:text-gray-300 ${buttonTextClass}`}
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
