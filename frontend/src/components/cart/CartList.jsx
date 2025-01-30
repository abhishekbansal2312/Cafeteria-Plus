import React, { useMemo } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";

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
    <div className="p-6 rounded-lg border shadow-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center gap-2">
        <FiShoppingCart className="text-blue-600 text-3xl" /> Your Cart
      </h2>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {cart.length === 0 && !loading && !error ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.dish._id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
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
