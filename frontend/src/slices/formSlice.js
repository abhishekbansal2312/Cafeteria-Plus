import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: { name: "", email: "", password: "", role: "customer" },
    isEditing: false,
    isModalOpen: false,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setFormData, setIsEditing, setIsModalOpen } = formSlice.actions;

export default formSlice.reducer;
