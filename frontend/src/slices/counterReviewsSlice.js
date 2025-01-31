import { createSlice } from "@reduxjs/toolkit";

const counterReviewsSlice = createSlice({
  name: "counterReviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
    },
    updateReview: (state, action) => {
      const index = state.reviews.findIndex(
        (review) => review._id === action.payload._id
      );
      if (index !== -1) {
        state.reviews[index] = action.payload; // Replace with updated review
      }
    },
  },
});

export const {
  setReviews,
  setLoading,
  setError,
  addReview,
  removeReview,
  updateReview,
} = counterReviewsSlice.actions;

export default counterReviewsSlice.reducer;
