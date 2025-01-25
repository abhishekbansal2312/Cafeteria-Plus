import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white p-4 border-b-1 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Cafeteria
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-black w-full md:w-auto left-0 md:flex-row flex-col items-center md:items-center space-y-4 md:space-y-0 p-4 md:p-0 transition-all duration-300 ease-in ${
            isOpen ? "top-16" : "top-[-500px]"
          }`}
        >
          <li>
            <Link
              to="/"
              className={` ${
                isActive("/")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={` ${
                isActive("/about")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={` ${
                isActive("/services")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              Counters
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={` ${
                isActive("/contact")
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : ""
              }`}
            >
              <Cart />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s"
                alt=""
                className="w-8 h-8 rounded-full"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
