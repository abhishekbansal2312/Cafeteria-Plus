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
import CounterDetailSkeleton from "../components/singleCounter/CounterDetailSkeleton";
import DishSkeleton from "../components/dishes/DishSkeleton";

export default function SingleCounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { counter } = useSelector((state) => state.counter);
  const { isMerchantModalOpen, merchants } = useSelector(
    (state) => state.merchants
  );
  const user = useSelector((state) => state.userDetail.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "breakfast",
    availability: true,
  });

  const getDishByCounter = async () => {
    try {
      setLoading(true);
      const response = await makeRequest(
        `http://localhost:3000/api/counters/${id}`,
        "GET",
        null,
        true
      );
      if (response && response.counter) {
        dispatch(setSelectedMerchants(response.counter.merchants));
        dispatch(setCounter(response.counter));
        dispatch(setDishes(response.dishes));
      }
    } catch (error) {
      console.error("Error fetching counter data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDishByCounter();

    return () => {
      dispatch(setCounter(null)); // Reset counter state on unmount
      dispatch(setDishes([]));
      dispatch(setMerchants([]));
      dispatch(setSelectedMerchants([]));
    };
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {loading ? (
        <div>
          <CounterDetailSkeleton />
          <DishSkeleton />
        </div>
      ) : counter ? (
        <>
          <div className="flex justify-end gap-3 items-center mb-6">
            {user?.role === "merchant" && (
              <Button onClick={handleOpenModal} text="Add Dish" />
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
                addMerchantInCounter={() => {}}
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
                handleChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                handleSubmit={(e) => e.preventDefault()}
                onCancel={() => setIsModalOpen(false)}
              />
            </Modal>
          )}

          <CounterDetails counter={counter} />
          <DishesList />
          <CounterReviews id={id} />
        </>
      ) : (
        <p className="text-center text-lg">Counter not found.</p>
      )}
    </div>
  );
}
