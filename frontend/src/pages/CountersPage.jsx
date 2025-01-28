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
  setFormData,
  resetFormData,
} from "../slices/counterSlice";
import Button from "../components/Button";
import CounterList from "../components/counter/CounterList";
import Modal from "../components/Modal";
import CounterForm from "../components/counter/CounterForm";
import { setIsEditing, setIsModalOpen } from "../slices/formSlice";
import CounterSkeleton from "../components/counter/CounterSkeleton";

export default function CounterPage({ theme }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { counters, loading, error, formData } = useSelector(
    (state) => state.counter
  );
  const isEditing = useSelector((state) => state.form.isEditing);
  const isModalOpen = useSelector((state) => state.form.isModalOpen);
  const [selectedButton, setSelectedButton] = useState("all");
  const user = useSelector((state) => state.userDetail.user);

  const fetchCounters = async (filter = "all") => {
    try {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const url =
        filter === "all"
          ? "http://localhost:3000/api/counters"
          : "http://localhost:3000/api/counters/merchantcounters";

      const response = await makeRequest(url, "GET", null, true);
      if (filter === "my") {
        dispatch(setCounters(response));
      } else {
        dispatch(setCounters(response.data));
      }

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
      dispatch(
        setFormData({
          _id: counter._id,
          counter_name: counter.counter_name,
          description: counter.description,
          location: counter.location,
          imageUrl: counter.imageUrl,
          operating_hours: counter.operating_hours || { open: "", close: "" },
          isActive: counter.isActive,
          theme: counter.theme,
        })
      );
      dispatch(setIsEditing(true));
    } else {
      dispatch(resetFormData());
      dispatch(setIsEditing(false));
    }
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(resetFormData());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await makeRequest(
          `http://localhost:3000/api/counters/${formData._id}`,
          "PUT",
          formData,
          true
        );
        dispatch(updateCounter(formData));
      } else {
        const response = await makeRequest(
          "http://localhost:3000/api/counters",
          "POST",
          formData,
          true
        );
        dispatch(addCounter(response));
      }
      handleCloseModal();
    } catch (error) {
      dispatch(setError("Failed to save counter"));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      dispatch(setFormData({ [name]: checked }));
    } else if (
      name === "operating_hours.open" ||
      name === "operating_hours.close"
    ) {
      dispatch(
        setFormData({
          operating_hours: {
            ...formData.operating_hours,
            [name.split(".")[1]]: value,
          },
        })
      );
    } else {
      dispatch(setFormData({ [name]: value }));
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen mb-20`}
    >
      {loading ? (
        <div>
          <CounterSkeleton />
        </div>
      ) : (
        <div>
          <div className="flex justify-end gap-2  mx-10 py-1 pt-4 ">
            {user && user.role === "merchant" && (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    fetchCounters("all");
                    setSelectedButton("all");
                  }}
                  text="All Counters"
                  disabled={selectedButton === "all"}
                />
                <Button
                  onClick={() => {
                    fetchCounters("my");
                    setSelectedButton("my");
                  }}
                  text="My Counters"
                  disabled={selectedButton === "my"}
                />
              </div>
            )}
            {user && user.role === "admin" && (
              <Button onClick={() => handleOpenModal()} text="Add Counter" />
            )}
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
