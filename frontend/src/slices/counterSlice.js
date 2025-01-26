import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: [],
    loading: true,
    error: null,
    formData: {
      counter_name: "",
      description: "",
      location: "",
      imageUrl: "",
      operating_hours: { open: "", close: "" },
      isActive: false,
    },
  },
  reducers: {
    setCounters: (state, action) => {
      state.counters = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCounter: (state, action) => {
      state.counters.push(action.payload);
    },
    updateCounter: (state, action) => {
      const updateCounter = action.payload;
      const index = state.counters.findIndex(
        (counter) => counter._id === updateCounter._id
      );
      if (index !== -1) {
        state.counters[index] = updateCounter;
      }
    },
    deleteCounter: (state, action) => {
      state.counters = state.counters.filter(
        (counter) => counter._id !== action.payload
      );
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        counter_name: "",
        description: "",
        location: "",
        imageUrl: "",
        operating_hours: { open: "", close: "" },
        isActive: false,
      };
    },
  },
});

export const {
  setCounters,
  setLoading,
  setError,
  addCounter,
  updateCounter,
  deleteCounter,
  setFormData,
  resetFormData,
} = counterSlice.actions;

export default counterSlice.reducer;
