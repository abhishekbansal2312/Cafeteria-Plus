import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import CounterDetails from "../components/singleCounter/CounterDetails";
import DishesList from "../components/dishes/DishesList";
import Button from "../components/Button";
import DishForm from "../components/dishes/DishForm";
import CounterReviews from "../components/singleCounter/CounterReviews";
import { setDishes, addDish } from "../slices/dishesSlice";
import Modal from "../components/Modal";
import AddMerchant from "../components/singleCounter/AddMerchant";
import {
  setMerchants,
  setIsMerchantModalOpen,
  setSelectedMerchants,
} from "../slices/merchantsSlice";
import { setCounter } from "../slices/counterSlice";
import DishSkeleton from "../components/dishes/DishSkeleton";
import CounterDetailSkeleton from "../components/singleCounter/CounterDetailSkeleton";

export default function SingleCounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { counter } = useSelector((state) => state.counter);
  const { isMerchantModalOpen, merchants } = useSelector(
    (state) => state.merchants
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    try {
      setLoading(true);
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
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMerchants = async () => {
    try {
      const response = await makeRequest(
        `http://localhost:3000/api/counters/merchants`,
        "GET",
        null,
        true
      );
      if (response) {
        dispatch(setMerchants(response.merchants));
      }
    } catch (err) {
      setError("Failed to fetch merchants");
    }
  };

  const addMerchantInCounter = async (selectedMerchants) => {
    try {
      setLoading(true);
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
    } catch (err) {
      setError("Failed to update merchants");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await makeRequest(
        `http://localhost:3000/api/dishes/${id}`,
        "POST",
        formData,
        true
      );
      if (response) {
        dispatch(addDish(response.dish));
        resetForm();
        setIsModalOpen(false);
      }
    } catch (err) {
      setError("Failed to add dish");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishByCounter();
    fetchMerchants();
    return () => {
      resetForm();
      dispatch(setDishes([]));
      dispatch(setMerchants([]));
      dispatch(setSelectedMerchants([]));
      dispatch(setCounter(null));
    };
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

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-end gap-3 items-center mb-6">
        {user?.role === "merchant" && (
          <Button onClick={() => setIsModalOpen(true)} text="Add Dish" />
        )}
        {user?.role === "admin" && (
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
          onClose={() => dispatch(setIsMerchantModalOpen(false))}
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
          onClose={() => setIsModalOpen(false)}
        >
          <DishForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmitDish}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      {loading ? (
        <CounterDetailSkeleton />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <CounterDetails counter={counter} />
      )}
      {loading ? <DishSkeleton /> : <DishesList />}
      <CounterReviews id={id} />
    </div>
  );
}
