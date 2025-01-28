import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  merchants: [],
  isMerchantModalOpen: false,
  selectedMerchants: [],
};

const merchantsSlice = createSlice({
  name: "merchants",
  initialState,
  reducers: {
    setMerchants: (state, action) => {
      state.merchants = action.payload;
    },
    setIsMerchantModalOpen: (state, action) => {
      state.isMerchantModalOpen = action.payload;
    },
    setSelectedMerchants: (state, action) => {
      state.selectedMerchants = action.payload;
    },
  },
});

export const { setMerchants, setIsMerchantModalOpen, setSelectedMerchants } =
  merchantsSlice.actions;

export default merchantsSlice.reducer;
