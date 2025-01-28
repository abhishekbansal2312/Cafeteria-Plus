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
import AddMerchant from "../components/singleCounter/AddMerchant";
import {
  setMerchants,
  setIsMerchantModalOpen,
  setSelectedMerchants,
} from "../slices/merchantsSlice";
import { setCounter } from "../slices/counterSlice";

export default function SingleCounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { id } = useParams();
  const { dishes } = useSelector((state) => state.dishes);
  const { isModalOpen, isEditing } = useSelector((state) => state.form);
  const { counter } = useSelector((state) => state.counter);
  const { isMerchantModalOpen, merchants } = useSelector(
    (state) => state.merchants
  );
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
      dispatch(setSelectedMerchants(response.counter.merchants));
      dispatch(setCounter(response.counter));
      dispatch(setDishes(response.dishes));
    }
  };

  const fetchMerchants = async () => {
    const response = await makeRequest(
      `http://localhost:3000/api/counters/merchants`,
      "GET",
      null,
      true
    );
    if (response) {
      dispatch(setMerchants(response.merchants));
    }
  };

  const addMerchantInCounter = async (selectedMerchants) => {
    const response = await makeRequest(
      `http://localhost:3000/api/counters/merchants/${id}`,
      "PUT",
      { merchantIds: selectedMerchants },
      true
    );
    if (response) {
      console.log(response.merchants, "response");

      dispatch(setSelectedMerchants(response.merchants));
      dispatch(setCounter(response.counter));
      dispatch(setIsMerchantModalOpen(false));
    }
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3000/api/dishes/${formData._id}`
      : `http://localhost:3000/api/dishes/${id}`;
    const method = isEditing ? "PUT" : "POST";

    const response = await makeRequest(url, method, formData, true);
    if (response) {
      dispatch(isEditing ? updateDish(response.dish) : addDish(response.dish));
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
    fetchMerchants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-end gap-3 items-center mb-6">
        <Button onClick={() => handleOpenModal()} text="Add Dish" />

        <Button
          onClick={() => dispatch(setIsMerchantModalOpen(true))} // Open modal via redux
          text="Add Merchants"
        />
      </div>

      {isMerchantModalOpen && (
        <Modal
          title="Select Merchants"
          isOpen={isMerchantModalOpen}
          onClose={() => dispatch(setIsMerchantModalOpen(false))} // Close modal via redux
        >
          <AddMerchant
            merchants={merchants}
            addMerchantInCounter={addMerchantInCounter}
          />
        </Modal>
      )}

      {isModalOpen && (
        <Modal
          title={isEditing ? "Edit Dish" : "Add Dish"}
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

      <CounterDetails counter={counter} />
      <DishesList
        dishes={dishes}
        handleEdit={handleOpenModal}
        handleDelete={handleDeleteDish}
      />
    </div>
  );
}
