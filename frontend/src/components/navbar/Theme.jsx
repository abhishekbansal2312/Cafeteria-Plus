import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons from react-icons

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex justify-between items-center">
      <button onClick={toggleTheme} className="flex items-center ">
        {theme === "light" ? (
          <FaMoon className="mr-2" />
        ) : (
          <FaSun className="mr-2" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
