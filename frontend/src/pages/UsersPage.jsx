import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import UsersList from "../components/users/UsersList";
import UserForm from "../components/users/UsersForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import UserSkeleton from "../components/users/UserSkeleton";
import SortBy from "../components/users/SortBy";
import {
  setUsers,
  setLoading,
  setError,
  deleteUser,
  addUser,
  updateUser,
} from "../slices/usersSlice";
import { setIsEditing, setIsModalOpen } from "../slices/formSlice";

export default function UsersPage({ theme }) {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { isEditing, isModalOpen } = useSelector((state) => state.form);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const makeRequest = useAxios();

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await makeRequest(
        "http://localhost:3000/api/users",
        "GET",
        null,
        true
      );
      console.log(response.data);

      dispatch(setUsers(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Failed to fetch users"));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await makeRequest(
        `http://localhost:3000/api/users/${id}`,
        "DELETE",
        null,
        true
      );
      dispatch(deleteUser(id));
    } catch (error) {
      dispatch(setError("Failed to delete user"));
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setFormData(user);
      dispatch(setIsEditing(true));
    } else {
      setFormData({ name: "", email: "", password: "", role: "customer" });
      dispatch(setIsEditing(false));
    }
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await makeRequest(
          `http://localhost:3000/api/users/${formData._id}`,
          "PUT",
          formData,
          true
        );
        console.log(response, "response edit");

        dispatch(updateUser(response.user));
      } else {
        const response = await makeRequest(
          "http://localhost:3000/api/users",
          "POST",
          formData,
          true
        );
        console.log(response.data, "response");
        dispatch(addUser(response.data));
      }
      handleCloseModal();
    } catch (error) {
      dispatch(setError("Failed to save user"));
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {loading ? (
        <UserSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center mx-10 py-1 pt-4">
            <div className="flex">
              <SearchBar />
              <SortBy />
            </div>
            <Button onClick={() => handleOpenModal()} text="Add User" />
          </div>

          <UsersList
            users={users}
            handleDelete={handleDelete}
            handleEdit={handleOpenModal}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={isEditing ? "Edit User" : "Add User"}
          >
            <UserForm
              formData={formData}
              isEditing={isEditing}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              darkMode={theme === "dark"}
              onClose={handleCloseModal}
            />
          </Modal>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
