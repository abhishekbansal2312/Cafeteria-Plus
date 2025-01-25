import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import UsersList from "../components/users/UsersList";
import UserForm from "../components/users/UsersForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import UserSkeleton from "../components/users/UserSkeleton";
import {
  setUsers,
  setLoading,
  setError,
  deleteUser,
  addUser,
  updateUser,
} from "../slices/usersSlice";
import { setFormData, setIsEditing, setIsModalOpen } from "../slices/formSlice";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { formData, isEditing, isModalOpen } = useSelector(
    (state) => state.form
  );

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
      dispatch(setUsers(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Failed to fetch users"));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

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
      dispatch(setFormData(user));
      dispatch(setIsEditing(true));
    } else {
      dispatch(
        setFormData({ name: "", email: "", password: "", role: "customer" })
      );
      dispatch(setIsEditing(false));
    }
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleChange = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await makeRequest(
          `http://localhost:3000/api/users/${formData._id}`,
          "PUT",
          formData,
          true
        );
        dispatch(updateUser(formData));
      } else {
        const response = await makeRequest(
          "http://localhost:3000/api/users",
          "POST",
          formData,
          true
        );
        dispatch(addUser(response.data));
      }
      handleCloseModal();
    } catch (error) {
      dispatch(setError("Failed to save user"));
    }
  };

  return (
    <div className=" bg-black text-neutral-200 min-h-screen">
      {loading ? (
        <UserSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center mx-10 py-1">
            <SearchBar />
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
              darkMode={false}
              onClose={handleCloseModal}
            />
          </Modal>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
