import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import UsersList from "../components/users/UsersList";
import UserForm from "../components/users/UsersForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";
import SortBy from "../components/users/SortBy";
import PaginateUsers from "../components/users/PaginateUsers";
import {
  setUsers,
  setLoading,
  deleteUser,
  addUser,
  updateUser,
} from "../slices/usersSlice";
import { setIsEditing, setIsModalOpen } from "../slices/formSlice";

export default function UsersPage({ theme }) {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
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
  const [search, setSearch] = useState("");

  const makeRequest = useAxios();

  const fetchUsers = async (pageNum = 1, role = "") => {
    try {
      dispatch(setLoading(true));

      const response = await makeRequest(
        `https://dinesync-seamlessdining.onrender.com/api/users?page=${pageNum}&limit=5&role=${role}&search=${search}`,
        "GET",
        null,
        true
      );

      dispatch(setUsers(response.data.results));
      setTotalPages(response.data.totalPages);
      setPage(pageNum);

      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Failed to fetch users");
      dispatch(setLoading(false));
      dispatch(setUsers([]));
    }
  };

  useEffect(() => {
    fetchUsers(1, role);
  }, [role, search]);

  const handleDelete = async (id) => {
    try {
      await makeRequest(
        `https://dinesync-seamlessdining.onrender.com/api/users/${id}`,
        "DELETE",
        null,
        true
      );
      dispatch(deleteUser(id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
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
          `https://dinesync-seamlessdining.onrender.com/api/users/${formData._id}`,
          "PUT",
          formData,
          true
        );
        dispatch(updateUser(response.user));
        toast.success("User updated successfully");
      } else {
        const response = await makeRequest(
          "https://dinesync-seamlessdining.onrender.com/api/users",
          "POST",
          formData,
          true
        );
        dispatch(addUser(response.data));
        toast.success("User added successfully");
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save user");
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center mx-4 sm:mx-10 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <SearchBar setSearch={setSearch} search={search} />
            <SortBy setRole={setRole} fetchUsers={fetchUsers} role={role} />
          </div>
          <Button
            onClick={() => handleOpenModal()}
            text="Add User"
            className="w-full sm:w-auto mt-4 sm:mt-0"
          />
        </div>

        <UsersList
          users={users}
          handleDelete={handleDelete}
          handleEdit={handleOpenModal}
          loading={loading}
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
    </div>
  );
}
