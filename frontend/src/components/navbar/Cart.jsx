import React from "react";
import Light from "../../assets/add-to-cart.png";
import Dark from "../../assets/add-to-cart1.png";
import { useSelector } from "react-redux";

export default function Cart({ theme }) {
  const cart = useSelector((state) => state.userDetail.user);

  const cartCount = cart?.cart || 0;

  return (
    <div className="relative">
      {theme === "dark" ? (
        <img src={Light} alt="Logo" className="w-full h-8" />
      ) : (
        <img src={Dark} alt="Logo" className="w-full h-8" />
      )}
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
          {cartCount}
        </span>
      )}
    </div>
  );
}
