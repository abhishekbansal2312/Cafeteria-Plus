import React, { useState, useEffect, useMemo } from "react";
import { MdDeleteForever } from "react-icons/md";
import { increaseQuantity, decreaseQuantity } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
const CartList = ({ cart, updateQuantity, removeItem, loading, error }) => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
    dispatch(decreaseQuantity(id));
  };

  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
    dispatch(increaseQuantity(id));
  };

  return (
    <div className="p-6 rounded-lg border max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        🛒 Your Cart
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
              className="flex items-center justify-between border p-3 mb-3 rounded-md"
            >
              <img
                src={item.dish.image}
                alt={item.dish.name}
                className="w-16 h-16 rounded-md object-cover border"
              />

              <div className="flex-1 ml-4">
                <h3 className="text-lg font-medium">{item.dish.name}</h3>
                <p className="text-gray-600">
                  ₹{item.dish.price} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center">
                <button
                  className="border px-3 py-1 rounded-md mr-2 bg-white hover:bg-gray-100"
                  onClick={() => handleDecrease(item.dish._id, item.quantity)}
                >
                  ➖
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="border px-3 py-1 rounded-md ml-1 bg-white hover:bg-gray-100"
                  onClick={() => handleIncrease(item.dish._id, item.quantity)}
                >
                  ➕
                </button>
              </div>

              <button
                className="text-black py-1 rounded-md ml-4"
                onClick={() => removeItem(item.dish._id)}
              >
                <MdDeleteForever className="h-8 w-8" />
              </button>
            </div>
          ))}

          <div className="flex justify-between text-xl font-semibold mt-4 border-t pt-3">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
