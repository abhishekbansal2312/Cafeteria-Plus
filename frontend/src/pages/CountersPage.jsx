import React, { useEffect } from "react";
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

export default function CounterPage() {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const { counters, loading, error } = useSelector((state) => state.counter);
  const { isModalOpen, isEditing, formData } = useSelector(
    (state) => state.counterForm
  );

  const fetchCounters = async () => {
    //working
    try {
      dispatch(setLoading(true));
      const response = await makeRequest(
        "http://localhost:3000/api/counters",
        "GET"
      );
      console.log(response.data);

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
    //working
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
      dispatch(setFormData(counter));
      dispatch(setIsEditing(true));
    } else {
      dispatch(setFormData({ name: "", value: 0 }));
      dispatch(setIsEditing(false));
    }
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
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
        dispatch(addCounter(response.data));
      }
      handleCloseModal();
    } catch (error) {
      dispatch(setError("Failed to save counter"));
    }
  };

  return (
    <div className="bg-black text-neutral-200 min-h-screen">
      {loading ? (
        <div>Loading...</div> // Loading state
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
              handleChange={(e) =>
                dispatch(
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                )
              }
            />
          </Modal>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
