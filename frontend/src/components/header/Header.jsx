import React from "react";
import image from "../../assets/pexels-janetrangdoan-1099680.jpg";
import { Link } from "react-router-dom";
const Header = ({ theme }) => {
  return (
    <div className={`${theme === "light" ? "bg-white" : "bg-black"} py-6`}>
      <div className="max-w-screen-xl mx-20">
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-black"
          } relative max-w-full h-[34vw] min-h-[300px] bg-cover rounded-2xl bg-no-repeat bg-center flex items-center px-6 sm:px-12`}
        >
          <div
            className={`${
              theme === "dark" ? "bg-gray-600" : "bg-orange-400"
            } absolute inset-0 bg-opacity-50 rounded-2xl`}
          ></div>

          <div className="relative w-full md:max-w-[50%] flex flex-col gap-6 animate-fadeIn z-10">
            <h2
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } text-[max(4.5vw,22px)] font-semibold`}
            >
              Order your favorite food here
            </h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-black"
              } text-[2vw] sm:text-[2vw] md:text-[1vw] lg:text-[1vw]`}
            >
              Choose from a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients. Satisfy your cravings and
              elevate your dining experience, one delicious meal at a time.
            </p>
            <Link to="/dishes">
              <button
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } font-medium py-2 px-6 text-[max(1vw,18px)] rounded-full cursor-pointer transition duration-300`}
              >
                View Menu
              </button>
            </Link>
          </div>

          <img
            src={image}
            alt="Delicious Food"
            className="absolute right-6 bottom-6 sm:right-12 sm:bottom-12 w-[250px] sm:w-[240px] md:w-[280px] lg:w-[400px] rounded-lg shadow-lg rotate-6 transition-transform duration-300 ease-in-out hover:rotate-12 z-10 hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
