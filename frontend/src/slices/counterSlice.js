import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: [],
    counter: {},
    loading: true,
    error: null,
    formData: {
      _id: "",
      counter_name: "",
      description: "",
      location: "",
      imageUrl: "",
      operating_hours: { open: "", close: "" },
      isActive: false,
      theme: "",
    },
  },
  reducers: {
    setCounters: (state, action) => {
      state.counters = action.payload;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
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
      const updatedCounter = action.payload;

      const index = state.counters.findIndex(
        (counter) => counter._id === updatedCounter._id
      );

      if (index !== -1) {
        state.counters[index] = {
          ...state.counters[index],
          ...updatedCounter,
          theme: updatedCounter.theme
            ? updatedCounter.theme.split(",").map((t) => t.trim())
            : [],
        };
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
        _id: "",
        counter_name: "",
        description: "",
        location: "",
        imageUrl: "",
        operating_hours: { open: "", close: "" },
        isActive: false,
        theme: "",
      };
    },
  },
});

export const {
  setCounters,
  setCounter,
  setLoading,
  setError,
  addCounter,
  updateCounter,
  deleteCounter,
  setFormData,
  resetFormData,
} = counterSlice.actions;

export default counterSlice.reducer;
