import React from "react";
import image from "../../assets/pexels-janetrangdoan-1099680.jpg";

const Header = () => {
  return (
    <div className="w-full bg-black py-6">
      <div className="max-w-screen-xl mx-20">
        <div className="relative max-w-full h-[34vw] min-h-[300px] bg-cover rounded-2xl bg-no-repeat bg-center flex items-center px-6 sm:px-12">
          <div className="absolute inset-0 bg-orange-400 bg-opacity-50 rounded-2xl"></div>

          <div className="relative max-w-[50%] flex flex-col gap-6 animate-fadeIn z-10">
            <h2 className="text-black text-[max(4.5vw,22px)] font-semibold">
              Order your favorite food here
            </h2>
            <p className="text-white text-[1vw] hidden sm:block">
              Choose from a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients. Satisfy your cravings and
              elevate your dining experience, one delicious meal at a time.
            </p>
            <a href="/menu">
              <button className="bg-white  text-gray-700 font-medium py-2 px-6 text-[max(1vw,18px)] rounded-full cursor-pointer transition duration-300 hover:bg-gray-100">
                View Menu
              </button>
            </a>
          </div>

          <img
            src={image}
            alt="Delicious Food"
            className="absolute right-6 bottom-6 sm:right-12 sm:bottom-12 
             w-[250px] sm:w-[280px] md:w-[310px] lg:w-[450px] 
             rounded-lg shadow-lg rotate-6 transition-transform duration-300 ease-in-out hover:rotate-12 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
