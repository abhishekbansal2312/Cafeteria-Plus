import React, { useMemo } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

export default function CartList({
  cart,
  updateQuantity,
  removeItem,
  loading,
  error,
}) {
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="p-6 rounded-lg border shadow-lg max-w-3xl mx-auto bg-white">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center gap-2">
        <FiShoppingCart className="text-blue-600" /> Your Cart
      </h2>

      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {cart.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.dish._id}
              className="flex items-center justify-between border p-4 mb-3 rounded-md bg-gray-50 hover:shadow-md transition-all"
            >
              <img
                src={item.dish.image}
                alt={item.dish.name}
                className="w-16 h-16 rounded-md object-cover border"
              />

              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {item.dish.name}
                </h3>
                <p className="text-sm text-gray-600">{item.dish.description}</p>
                <p className="text-gray-700 font-semibold">
                  ₹{item.dish.price} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="border px-3 py-1 rounded-md bg-white hover:bg-gray-100 transition-all"
                  onClick={() => updateQuantity(item._id, item.quantity, "dec")}
                >
                  ➖
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  className="border px-3 py-1 rounded-md bg-white hover:bg-gray-100 transition-all"
                  onClick={() => updateQuantity(item._id, item.quantity, "inc")}
                >
                  ➕
                </button>
              </div>

              <button
                className="text-red-500 hover:text-red-700 transition-all"
                onClick={() => removeItem(item._id)}
              >
                <MdDeleteForever className="h-8 w-8" />
              </button>
            </div>
          ))}

          <div className="flex justify-between text-xl font-semibold mt-6 border-t pt-4">
            <span>Total Amount:</span>
            <span className="text-blue-600">₹{totalPrice}</span>
          </div>

          <button className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
