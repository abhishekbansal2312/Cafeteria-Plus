import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

export default function CartItem({ item, updateQuantity, removeItem }) {
  const handleRemove = () => {
    removeItem(item._id);
    toast.success(`${item.dish.name} removed from cart`);
  };

  const handleIncrease = () => {
    updateQuantity(item._id, item.quantity, "inc");
    toast.success(`${item.dish.name} quantity increased`);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity, "dec");
      toast.success(`${item.dish.name} quantity decreased`);
    } else {
      handleRemove();
    }
  };

  return (
    <div className="relative flex items-center justify-between border p-4 mb-3 rounded-md hover:shadow-lg transition-all">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all"
        onClick={handleRemove}
      >
        <TiDeleteOutline className="h-7 w-7" />
      </button>

      <img
        src={item.dish.image}
        alt={item.dish.name}
        className="w-20 h-20 rounded-md object-cover border"
      />

      <div className="flex-1 ml-4">
        <h3 className="text-lg font-medium">{item.dish.name}</h3>
        <p className="text-sm italic">{item.dish.description}</p>
        <p className="font-semibold text-lg">
          ₹{item.dish.price} x {item.quantity}
        </p>
      </div>

      <div className="flex flex-col">
        <div>
          <button
            className="border px-3 py-1 rounded-md hover:bg-gray-200 transition-all text-lg font-semibold"
            onClick={handleDecrease}
          >
            ➖
          </button>

          <span className="text-lg font-semibold w-8 text-center px-2">
            {item.quantity}
          </span>

          <button
            className="border px-3 py-1 rounded-md hover:bg-gray-200 transition-all text-lg font-semibold"
            onClick={handleIncrease}
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
}
