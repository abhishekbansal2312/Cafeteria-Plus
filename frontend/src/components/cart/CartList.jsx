import React, { useMemo } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  const totalCartItems = useSelector((state) => state.cart.totalCartItems);

  return (
    <div className="p-6 rounded-lg border shadow-xl max-w-6xl mx-auto bg-white mt-4">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center gap-2 text-gray-800">
        <FiShoppingCart className="text-blue-600 text-3xl" /> Your Cart
      </h2>

      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {cart.length === 0 && !loading && !error ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.dish._id}
                  className="flex items-center justify-between border p-4 mb-3 rounded-md bg-gray-50 hover:shadow-lg transition-all"
                >
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-20 h-20 rounded-md object-cover border"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.dish.name}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {item.dish.description}
                    </p>
                    <p className="text-gray-700 font-semibold text-lg">
                      ₹{item.dish.price} x {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="border px-3 py-1 rounded-md bg-white hover:bg-gray-200 transition-all text-lg font-semibold"
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item._id, item.quantity, "dec")
                          : removeItem(item._id)
                      }
                    >
                      ➖
                    </button>

                    <span className="text-lg font-semibold w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="border px-3 py-1 rounded-md bg-white hover:bg-gray-200 transition-all text-lg font-semibold"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity, "inc")
                      }
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
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 p-4 border rounded-lg shadow-md bg-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Order Summary
          </h3>

          <div className="mb-3">
            {cart.map((item) => (
              <div
                key={item.dish._id}
                className="flex justify-between text-gray-700 text-sm border-b py-2"
              >
                <span>
                  {item.dish.name} x {item.quantity}
                </span>
                <span>₹{item.dish.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-medium pt-3 text-gray-900">
            <span>Total Amount:</span>
            <span className="text-blue-600 font-bold">₹{totalPrice}</span>
          </div>

          <button className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all text-lg">
            {totalCartItems === 0 ? (
              <Link to="/dishes" className="text-white">
                <>Select Items Please</>
              </Link>
            ) : (
              <>Proceed to Checkout</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
