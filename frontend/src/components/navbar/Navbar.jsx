import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import Logout from "./Logout";
import Theme from "./Theme";
import { ThemeContext } from "../../context/ThemeContext";
import Light from "../../assets/logo-light.png";
import Dark from "../../assets/logo-dark.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.userDetail);
  const isLoggedIn = useSelector((state) => state.userDetail.isLoggedIn);
  const { theme } = useContext(ThemeContext);
  const navbarRef = useRef(null);

  // Close the navbar if click is outside of the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`p-4 border-b shadow-md sticky top-0 z-50  ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      ref={navbarRef}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex-shrink-0">
          <img
            src={theme === "dark" ? Dark : Light}
            alt="Logo"
            className="h-10"
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-2xl"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        <ul
          className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-opacity-95 md:bg-opacity-100 ${
            theme === "dark"
              ? "bg-black md:bg-transparent"
              : "bg-white md:bg-transparent"
          } flex-col md:flex-row items-center md:p-0 ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li className=" font-semibold">
            {user ? `Welcome, ${user.name}` : ""}
          </li>
          <li>
            {!isLoggedIn ? (
              <Link to="/login" className="hover:text-orange-500 transition">
                Login
              </Link>
            ) : (
              <Link to="/profile">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s"
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/"
              className={`hover:text-orange-500 transition ${
                isActive("/")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link
                to="/users"
                className={`hover:text-orange-500 transition ${
                  isActive("/users")
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : ""
                }`}
              >
                Users
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/counters"
              className={`hover:text-orange-500 transition ${
                isActive("/counters")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Counters
            </Link>
          </li>
          <li>
            <Theme />
          </li>
          <li>
            <Link
              to="/cart"
              className={`hover:text-orange-500 transition ${
                isActive("/cart")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              <Cart theme={theme} />
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
