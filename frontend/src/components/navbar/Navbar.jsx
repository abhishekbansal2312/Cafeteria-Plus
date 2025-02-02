import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import Theme from "./Theme";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Light from "../../assets/logo-light.png";
import Dark from "../../assets/logo-dark.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.userDetail.user);
  const isLoggedIn = useSelector((state) => state.userDetail.isLoggedIn);
  const { theme } = useContext(ThemeContext);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`p-4 border-b ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          <img
            src={theme === "dark" ? Dark : Light}
            alt="Logo"
            className="h-10"
          />
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => {
              console.log("Button clicked");
              setIsOpen(!isOpen);
            }}
            className="focus:outline-none text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        <ul
          className={`
          md:flex md:space-x-6 fixed md:static inset-0 md:inset-auto bg-opacity-95 md:bg-opacity-100 
          ${
            theme === "dark" ? "bg-black" : "bg-white"
          } w-full md:w-auto flex-col md:flex-row items-center 
          space-y-6 md:space-y-0 p-6 md:p-0 transition-all duration-300 
          ${
            isOpen ? "top-16 opacity-100" : "-top-full opacity-0 md:opacity-100"
          }`}
        >
          <li>
            {user ? (
              <span>Welcome, {user.name}</span>
            ) : (
              <Link to="/login" className="hover:text-orange-500">
                Login
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
            >
              Home
            </Link>
          </li>
          {user && user.role === "admin" && (
            <li>
              <Link
                to="/users"
                className={`${
                  isActive("/users")
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "hover:text-orange-500"
                }`}
              >
                Users
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/counters"
              className={`${
                isActive("/counters")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
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
              className={`${
                isActive("/cart")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
            >
              <Cart theme={theme} />
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
