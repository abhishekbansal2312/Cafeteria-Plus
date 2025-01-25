import React, { useState } from "react";
import image from "../../assets/add-to-cart.png";

export default function Cart() {
  const cartCount = 2;

  return (
    <div className="relative">
      <img src={image} alt="cart" className="h-8 w-8" />

      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
          {cartCount}
        </span>
      )}
    </div>
  );
}
