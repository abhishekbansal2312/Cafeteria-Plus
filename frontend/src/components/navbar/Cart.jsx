import React from "react";
import Light from "../../assets/add-to-cart.png";
import Dark from "../../assets/add-to-cart1.png";
import { useSelector } from "react-redux";

export default function Cart({ theme, menuIsOpen }) {
  const cartCount = useSelector((state) => state.cart.totalCartItems);

  return (
    <div className="relative w-9">
      {menuIsOpen ? (
        <span className="text-lg  text-gray-800">Cart</span>
      ) : (
        <>
          {theme === "dark" ? (
            <img src={Light} alt="Cart Logo" className=" h-8" />
          ) : (
            <img src={Dark} alt="Cart Logo" className=" h-8" />
          )}

          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
            {cartCount > 0 ? cartCount : 0}
          </span>
        </>
      )}
    </div>
  );
}
