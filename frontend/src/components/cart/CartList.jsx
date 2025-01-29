import React, { useMemo } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";

export default function CartList({
  cart,
  updateQuantity,
  removeItem,
  loading,
  error,
}) {
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => (acc + item.dish.price || 1) * item.quantity,
      0
    );
  }, [cart]);

  const totalCartItems = useSelector((state) => state.cart.totalCartItems);

  return (
    <div className="p-6 rounded-lg border shadow-xl max-w-6xl mx-auto ">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center gap-2 ">
        <FiShoppingCart className="text-blue-600 text-3xl" /> Your Cart
      </h2>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center ">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {cart.length === 0 && !loading && !error ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.dish._id}
                  className="relative flex items-center justify-between border p-4 mb-3 rounded-md hover:shadow-lg transition-all"
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all"
                    onClick={() => removeItem(item._id)}
                  >
                    <TiDeleteOutline className="h-7 w-7" />
                  </button>

                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-20 h-20 rounded-md object-cover border"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium ">{item.dish.name}</h3>

                    <p className="text-sm  italic">{item.dish.description}</p>
                    <p className=" font-semibold text-lg">
                      ₹{item.dish.price} x {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <button
                        className="border px-3 py-1 rounded-md  hover:bg-gray-200 transition-all text-lg font-semibold"
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item._id, item.quantity, "dec")
                            : removeItem(item._id)
                        }
                      >
                        ➖
                      </button>

                      <span className="text-lg font-semibold w-8 text-center px-2">
                        {item.quantity}
                      </span>

                      <button
                        className="border px-3 py-1 rounded-md  hover:bg-gray-200 transition-all text-lg font-semibold"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity, "inc")
                        }
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <CartSummary
          cart={cart}
          totalPrice={totalPrice}
          totalCartItems={totalCartItems}
        />
      </div>
    </div>
  );
}
