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
import PaginateUsers from "../components/users/PaginateUsers";
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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [role, setRole] = useState("");

  const makeRequest = useAxios();

  const fetchUsers = async (pageNum = 1, role = "") => {
    try {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await makeRequest(
        `http://localhost:3000/api/users?page=${pageNum}&limit=5&role=${role}`,
        "GET",
        null,
        true
      );

      dispatch(setUsers(response.data.results));
      setTotalPages(response.data.totalPages);
      setPage(pageNum);

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Failed to fetch users"));
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUsers(1, role);
  }, [role]);

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
        dispatch(updateUser(response.user));
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
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {loading ? (
        <UserSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center mx-10 py-1 pt-4">
            <div className="flex">
              <SearchBar />
              <SortBy setRole={setRole} fetchUsers={fetchUsers} role={role} />
            </div>
            <Button onClick={() => handleOpenModal()} text="Add User" />
          </div>

          <UsersList
            users={users}
            handleDelete={handleDelete}
            handleEdit={handleOpenModal}
          />
          <PaginateUsers
            fetchUsers={fetchUsers}
            page={page}
            totalPages={totalPages}
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
