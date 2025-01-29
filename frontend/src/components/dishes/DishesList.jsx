import React, { useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { setTotalCartItems } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const DishesList = ({ dishes, handleDelete, handleEdit }) => {
  const dispatch = useDispatch();
  const makeRequest = useAxios();

  const cartItems = useSelector((state) => state.cart.dishes) || [];
  const cartIds = cartItems.map((item) => item.dish);

  useEffect(() => {
    console.log(cartItems, "Cart items");
    console.log(cartIds, "Dish IDs in cart");
  }, [cartItems]);

  const addToCart = async (dish) => {
    try {
      const response = await makeRequest(
        `http://localhost:3000/api/cart`,
        "POST",
        { id: dish._id },
        true
      );

      if (response) {
        dispatch(setTotalCartItems(response.length));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {dishes.map((dish) => (
        <div
          key={dish._id}
          className="shadow-lg rounded-lg overflow-hidden border"
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{dish.name}</h3>
            <p className="text-sm">{dish.description}</p>

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm">
                <p className="font-bold">₹{dish.price}</p>
                <p className="text-sm">Category: {dish.category}</p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    dish.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {dish.availability ? "Available" : "Out of Stock"}
                </p>
              </div>
              <button
                onClick={() => addToCart(dish)}
                className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition ${
                  cartIds.includes(dish._id)
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
                disabled={cartIds.includes(dish._id)}
              >
                {cartIds.includes(dish._id) ? "Already in Cart" : "Order Now"}
              </button>
            </div>

            <div className="flex justify-between items-center mt-3">
              <button
                onClick={() => handleEdit(dish)}
                className="text-blue-600 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(dish._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DishesList;
