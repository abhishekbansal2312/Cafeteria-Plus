import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DishesList from "../components/dishes/DishesList";
import { useDispatch, useSelector } from "react-redux";
import { deleteDish, updateDish } from "../slices/dishesSlice";
import { setIsModalOpen, setIsEditing } from "../slices/formSlice";
import { setCartDishes, setTotalCartItems } from "../slices/cartSlice";
import Modal from "../components/Modal";
import DishForm from "../components/dishes/DishForm";

export default function DishesPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "breakfast",
    availability: true,
  });

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.form.isModalOpen);
  const makeRequest = useAxios();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();

    // return () => {};
  }, []);

  const fetchDishes = async () => {
    const response = await makeRequest(
      "http://localhost:3000/api/dishes",
      "GET"
    );
    if (Array.isArray(response)) {
      setDishes(response);
    }
  };

  const handleDeleteDish = async (dishId) => {
    const response = await makeRequest(
      `http://localhost:3000/api/dishes/${dishId}`,
      "DELETE",
      null,
      true
    );
    if (response) {
      dispatch(deleteDish(dishId));
      setDishes((prevDishes) =>
        prevDishes.filter((dish) => dish._id !== dishId)
      );
    }
  };

  const handleEditDish = (dish) => {
    setFormData(dish);
    dispatch(setIsEditing(true));
    dispatch(setIsModalOpen(true));
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    const response = await makeRequest(
      `http://localhost:3000/api/dishes/${formData._id}`,
      "PUT",
      formData,
      true
    );
    if (response && response.dish) {
      dispatch(updateDish(response.dish));
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish._id === response.dish._id ? response.dish : dish
        )
      );
      dispatch(setIsModalOpen(false));
      resetForm();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "breakfast",
      availability: true,
    });
  };

  return (
    <div>
      <DishesList
        dishes={dishes}
        handleDelete={handleDeleteDish}
        handleEdit={handleEditDish}
      />

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
    </div>
  );
}
