import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import CounterDetails from "../components/singleCounter/CounterDetails";
import DishesList from "../components/dishes/DishesList";
import Button from "../components/Button";
import DishForm from "../components/dishes/DishForm";

import { setDishes, addDish } from "../slices/dishesSlice";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const user = useSelector((state) => state.userDetail.user);
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
      dispatch(setSelectedMerchants(response.merchants));
      dispatch(setCounter(response.counter));
      dispatch(setIsMerchantModalOpen(false));
    }
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/dishes/${id}`;
    const method = "POST";

    const response = await makeRequest(url, method, formData, true);
    if (response) {
      dispatch(addDish(response.dish));
      resetForm();
      dispatch(setIsModalOpen(false));
    }
  };

  useEffect(() => {
    getDishByCounter();
    fetchMerchants();
  }, [id]);

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

  const handleOpenModal = () => {
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

        {user && user.role === "admin" && (
          <Button
            onClick={() => dispatch(setIsMerchantModalOpen(true))}
            text="Manage Merchants"
          />
        )}
      </div>

      {isMerchantModalOpen && (
        <Modal
          title="Select Merchants"
          isOpen={isMerchantModalOpen}
          onClose={() => dispatch(setIsMerchantModalOpen(false))} //
        >
          <AddMerchant
            merchants={merchants}
            addMerchantInCounter={addMerchantInCounter}
          />
        </Modal>
      )}

      {isModalOpen && (
        <Modal
          title="Add Dish"
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
      <DishesList />
    </div>
  );
}
