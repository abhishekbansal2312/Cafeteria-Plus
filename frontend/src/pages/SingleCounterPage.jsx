import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import CounterDetails from "../components/singleCounter/CounterDetails";
import DishesList from "../components/dishes/DishesList";
import Button from "../components/Button";
import DishForm from "../components/dishes/DishForm";
import { setIsModalOpen, setIsEditing } from "../slices/formSlice";
import {
  setDishes,
  addDish,
  updateDish,
  deleteDish,
} from "../slices/dishesSlice";
import Modal from "../components/Modal";

export default function SingleCounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { id } = useParams();
  const [counter, setCounter] = useState({});
  const { dishes } = useSelector((state) => state.dishes);
  const { isModalOpen, isEditing } = useSelector((state) => state.form);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "breakfast",
    availability: true,
  });

  const getDishByCounter = async () => {
    const response = await makeRequest(
      `http://localhost:3000/api/counters/${id}`,
      "GET",
      null,
      true
    );
    if (response) {
      setCounter(response.counter);
      dispatch(setDishes(response.dishes));
    }
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const response = await makeRequest(
        `http://localhost:3000/api/dishes/${formData._id}`,
        "PUT",
        formData,
        true
      );
      if (response) {
        dispatch(updateDish(response.dish));
      }
    } else {
      const response = await makeRequest(
        `http://localhost:3000/api/dishes/${id}`,
        "POST",
        formData,
        true
      );
      if (response) {
        dispatch(addDish(response.dish));
      }
    }
    dispatch(setIsModalOpen(false));
    dispatch(setIsEditing(false));
    resetForm();
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
    }
  };

  useEffect(() => {
    getDishByCounter();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleOpenModal = (dish = null) => {
    if (dish) {
      setFormData(dish);
      dispatch(setIsEditing(true));
    } else {
      resetForm();
      dispatch(setIsEditing(false));
    }
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    resetForm();
    dispatch(setIsModalOpen(false));
    dispatch(setIsEditing(false));
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-end mb-6">
        <Button onClick={() => handleOpenModal()} text="Add Dish" />
      </div>

      {isModalOpen && (
        <Modal
          title={isEditing ? "Edit Dish" : "Add Dish"}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <DishForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmitDish}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      <CounterDetails counter={counter} />
      <DishesList
        dishes={dishes}
        handleEdit={handleOpenModal}
        handleDelete={handleDeleteDish}
      />
    </div>
  );
}
