import React, { useState } from "react";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import useAxios from "../../hooks/useAxios";
import { removeReview, updateReview } from "../../slices/counterReviewsSlice";
import ReviewEditForm from "./ReviewEditForm";
import { FaMapMarkerAlt, FaEdit, FaTrashAlt, FaCircle } from "react-icons/fa";

export default function Reviews({ reviews }) {
  const dispatch = useDispatch();
  const makeRequest = useAxios();
  const [editingReview, setEditingReview] = useState(null);
  const [updatedReviewData, setUpdatedReviewData] = useState({
    title: "",
    rating: 0,
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (review) => {
    setEditingReview(review);
    setUpdatedReviewData({
      title: review.title,
      rating: review.rating,
      comment: review.comment,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const response = await makeRequest(
      `http://localhost:3000/api/reviews/${id}`,
      "DELETE"
    );
    if (response) {
      dispatch(removeReview(id));
    }
    setIsModalOpen(false);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setRating = (rating) => {
    setUpdatedReviewData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (editingReview) {
      const updatedReview = {
        ...editingReview,
        title: updatedReviewData.title,
        rating: updatedReviewData.rating,
        comment: updatedReviewData.comment,
      };
      const response = await makeRequest(
        `http://localhost:3000/api/reviews/${editingReview._id}`,
        "PUT",
        updatedReview
      );
      if (response) {
        dispatch(updateReview(updatedReview));
      }
      setIsModalOpen(false);
      setEditingReview(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27l-5.18 2.73a1 1 0 0 1-1.45-1.05l1-5.85-4.24-4.12a1 1 0 0 1 .56-1.7l5.91-.87L8.17.57A1 1 0 0 1 9 0h2a1 1 0 0 1 .83.57l2.19 4.47 5.91.87a1 1 0 0 1 .56 1.7l-4.24 4.12 1 5.85a1 1 0 0 1-1.45 1.05L10 15.27z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-md space-y-3 bg-white"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">{review.title}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-500 text-sm">{review.user.name}</p>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDeleteClick(review._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition"
                >
                  <FaTrashAlt className="inline-block mr-2" />
                  Remove
                </button>
                <button
                  onClick={() => handleEditClick(review)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-600 transition"
                >
                  <FaEdit className="inline-block mr-2" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          title={"Edit Review"}
        >
          <ReviewEditForm
            setRating={setRating}
            updatedReviewData={updatedReviewData}
            handleUpdateChange={handleUpdateChange}
            handleUpdateSubmit={handleUpdateSubmit}
          />
        </Modal>
      )}
    </div>
  );
}
