import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import { useDispatch, useSelector } from "react-redux";
import {
  setReviews,
  setLoading,
  setError,
  addReview,
} from "../../slices/counterReviewsSlice";
import useAxios from "../../hooks/useAxios";

export default function CounterReviews({ id }) {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.counterReviews
  ); // Access reviews, loading, and error states from Redux
  const makeRequest = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
    comment: "",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(setLoading(true));
      try {
        const response = await makeRequest(
          `http://localhost:3000/api/reviews/${id}`,
          "GET"
        );
        console.log(reviews);

        dispatch(setReviews(response));
      } catch (err) {
        dispatch(setError("Error fetching reviews"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const setRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating, // Update the rating value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await createReviewForCounter();
      console.log(response);

      if (response) {
        dispatch(addReview(response)); // Add the new review to Redux store
        setFormData({ title: "", rating: 0, comment: "" }); // Clear form data after successful submission
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message });
      console.error(err);
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const createReviewForCounter = async () => {
    return makeRequest(
      "http://localhost:3000/api/reviews",
      "POST",
      {
        title: formData.title,
        rating: formData.rating,
        comment: formData.comment,
        counterId: id,
      },
      true
    );
  };

  return (
    <div className="border-t-1 mt-6">
      {status.error && <p className="text-red-500">{status.error}</p>}
      <ReviewForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setRating={setRating}
        formData={formData}
      />
      {status.loading && <p className="text-blue-500">Submitting review...</p>}
      {/* Pass reviews from Redux store to Reviews component */}
      <Reviews reviews={reviews} />
    </div>
  );
}
