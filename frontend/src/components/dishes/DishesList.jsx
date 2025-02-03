import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { setCartDishes, setTotalCartItems } from "../../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteDish, updateDish } from "../../slices/dishesSlice";
import { setIsModalOpen, setIsEditing } from "../../slices/formSlice";
import Modal from "../Modal";
import DishForm from "../dishes/DishForm";
import toast from "react-hot-toast";

const DishesList = () => {
  const { dishes } = useSelector((state) => state.dishes);
  const { user } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const cartItems = useSelector((state) => state.cart.dishes) || [];
  const isModalOpen = useSelector((state) => state.form.isModalOpen);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "breakfast",
    availability: true,
  });

  const cartIds = cartItems.map((item) => item.dish._id);

  const handleDeleteDish = async (dishId) => {
    try {
      const response = await makeRequest(
        `http://localhost:3000/api/dishes/${dishId}`,
        "DELETE",
        null,
        true
      );
      if (response) {
        dispatch(deleteDish(dishId));
        toast.success("Dish deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
      toast.error("Failed to delete dish");
    }
  };

  const handleEditDish = (dish) => {
    setFormData(dish);
    dispatch(setIsEditing(true));
    dispatch(setIsModalOpen(true));
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    try {
      const response = await makeRequest(
        `http://localhost:3000/api/dishes/${formData._id}`,
        "PUT",
        formData,
        true
      );
      if (response && response.dish) {
        dispatch(updateDish(response.dish));
        dispatch(setIsEditing(false));
        dispatch(setIsModalOpen(false));
        toast.success("Dish updated successfully");
      }
    } catch (error) {
      console.error("Error updating dish:", error);
      toast.error("Failed to update dish");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addToCart = async (dish) => {
    if (!user) {
      toast.error("Please login to add dish to cart");
      return;
    }
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/cart",
        "POST",
        { id: dish._id },
        true
      );
      if (response) {
        dispatch(setTotalCartItems(response.length));
        dispatch(setCartDishes(response));
        toast.success("Dish added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add dish to cart");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {isModalOpen && (
        <Modal
          title="Edit Dish"
          isOpen={isModalOpen}
          onClose={() => dispatch(setIsModalOpen(false))}
        >
          <DishForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmitDish}
            onCancel={() => dispatch(setIsModalOpen(false))}
          />
        </Modal>
      )}
      {dishes.map((dish) => {
        const isMerchant =
          user?.role === "merchant" &&
          dish?.counter?.merchants?.includes(user.id);

        return (
          <div
            key={dish._id}
            className="shadow-lg rounded-lg overflow-hidden border"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
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
                    cartIds.includes(dish._id) || !dish.availability
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={cartIds.includes(dish._id) || !dish.availability}
                >
                  {dish.availability
                    ? cartIds.includes(dish._id)
                      ? "Already in Cart"
                      : "Order Now"
                    : "Out of Stock"}
                </button>
              </div>

              {isMerchant && (
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleEditDish(dish)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DishesList;
