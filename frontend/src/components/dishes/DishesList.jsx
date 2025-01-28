import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { setTotalCartItems } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const DishesList = ({ dishes, handleDelete, handleEdit }) => {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const addToCart = async (dish) => {
    console.log(dish._id);
    const response = await makeRequest(
      `http://localhost:3000/api/cart`,
      "POST",
      { id: dish._id },
      true
    );
    dispatch(setTotalCartItems(response.length));
  };

  // const cartItems = useSelector((state) => state.cart.dishes);
  // console.log(cartItems);

  // const dishIds = cartItems.map((dish) => dish._id);
  // console.log(dishIds, " dishIds");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {dishes.map((dish) => (
        <div
          key={dish._id}
          className=" shadow-lg rounded-lg overflow-hidden border-1"
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold ">{dish.name}</h3>
            <p className=" text-sm">{dish.description}</p>
            <div className="flex justify-between items-center">
              <div className=" text-sm">
                <p className=" font-bold mt-2">₹{dish.price}</p>
                <p className=" text-sm">Category: {dish.category}</p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    dish.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {dish.availability ? "Available" : "Out of Stock"}
                </p>
              </div>
              <div>
                <button
                  onClick={() => addToCart(dish)}
                  className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded`}
                >
                  Order Now
                </button>
              </div>
            </div>
            <div className="flex justify-between gap-4 mt-1">
              <button onClick={() => handleEdit(dish)} className="">
                <FaEdit className="mr-2" />
              </button>
              <button onClick={() => handleDelete(dish._id)} className="">
                <FaTrashAlt className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DishesList;
