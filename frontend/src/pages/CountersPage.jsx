import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import {
  setCounters,
  setLoading,
  setError,
  addCounter,
  updateCounter,
  deleteCounter,
} from "../slices/counterSlice";
import Button from "../components/Button";
import CounterList from "../components/counter/CounterList";
import Modal from "../components/Modal";
import CounterForm from "../components/counter/CounterForm";

export default function CounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { counters, loading, error } = useSelector((state) => state.counter);
  const [formData, setFormData] = useState({
    counter_name: "",
    description: "",
    location: "",
    imageUrl: "",
    operating_hours: { open: "", close: "" },
    isActive: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCounters = async () => {
    try {
      dispatch(setLoading(true));
      const response = await makeRequest(
        "http://localhost:3000/api/counters",
        "GET"
      );
      dispatch(setCounters(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Failed to fetch counters"));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCounters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await makeRequest(
        `http://localhost:3000/api/counters/${id}`,
        "DELETE",
        null,
        true
      );
      dispatch(deleteCounter(id));
    } catch (error) {
      dispatch(setError("Failed to delete counter"));
    }
  };

  const handleOpenModal = (counter = null) => {
    if (counter) {
      setFormData({
        counter_name: counter.counter_name,
        description: counter.description,
        location: counter.location,
        imageUrl: counter.imageUrl,
        operating_hours: counter.operating_hours || { open: "", close: "" },
        isActive: counter.isActive,
      });
      setIsEditing(true);
    } else {
      setFormData({
        counter_name: "",
        description: "",
        location: "",
        imageUrl: "",
        operating_hours: { open: "", close: "" },
        isActive: false,
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      counter_name: "",
      description: "",
      location: "",
      imageUrl: "",
      operating_hours: { open: "", close: "" },
      isActive: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await makeRequest(
          `http://localhost:3000/api/counters/${formData._id}`,
          "PUT",
          formData
        );
        dispatch(updateCounter(formData));
      } else {
        const response = await makeRequest(
          "http://localhost:3000/api/counters",
          "POST",
          formData
        );
        dispatch(addCounter(response));
      }
      handleCloseModal();
    } catch (error) {
      dispatch(setError("Failed to save counter"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "operating_hours.open" || name === "operating_hours.close") {
      setFormData((prevData) => ({
        ...prevData,
        operating_hours: {
          ...prevData.operating_hours,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex justify-between items-center mx-10 py-1 pt-4">
            <Button onClick={() => handleOpenModal()} text="Add Counter" />
          </div>

          <CounterList
            counters={counters}
            handleDelete={handleDelete}
            handleEdit={handleOpenModal}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={isEditing ? "Edit Counter" : "Add Counter"}
          >
            <CounterForm
              formData={formData}
              isEditing={isEditing}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </Modal>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
