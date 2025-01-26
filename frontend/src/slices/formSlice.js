import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    isEditing: false,
    isModalOpen: false,
  },
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setIsEditing, setIsModalOpen } = formSlice.actions;

export default formSlice.reducer;
