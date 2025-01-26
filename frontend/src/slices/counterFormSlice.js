// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "counterForm",
  initialState: {
    isModalOpen: false,
    isEditing: false,
    formData: {
      counter_name: "",
      description: "",
      location: "",
      imageUrl: "",
      operating_hours: { open: "", close: "" },
      merchants: [],
      dishes: [],
      isActive: true,
    },
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setIsModalOpen, setIsEditing, setFormData } = modalSlice.actions;
export default modalSlice.reducer;
