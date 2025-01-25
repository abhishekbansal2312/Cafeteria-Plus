import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: true,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const {
  setUsers,
  setLoading,
  setError,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
