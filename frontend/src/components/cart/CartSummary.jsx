import React from "react";
import { Link } from "react-router-dom";

export default function CartSummary({ cart, totalPrice, totalCartItems }) {
  return (
    <div className="w-full lg:w-1/3 p-4 border rounded-lg shadow-md ">
      <h3 className="text-xl font-semibold  mb-3">Order Summary</h3>

      <div className="mb-3">
        {cart.map((item) => (
          <div
            key={item.dish._id}
            className="flex justify-between  text-sm border-b py-2"
          >
            <span>
              {item.dish.name} x {item.quantity}
            </span>
            <span>₹{item.dish.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-medium pt-3 ">
        <span>Total Amount:</span>
        <span className="text-blue-600 font-bold">₹{totalPrice}</span>
      </div>

      <button className="w-full mt-5 py-3 bg-blue-600  text-stone-200 font-semibold rounded-md hover:bg-blue-700 transition-all text-lg">
        {totalCartItems === 0 ? (
          <Link to="/dishes" className="">
            <>Select Items Please</>
          </Link>
        ) : (
          <>Proceed to Checkout</>
        )}
      </button>
    </div>
  );
}
