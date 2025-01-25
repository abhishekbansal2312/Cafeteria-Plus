import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import UsersList from "../components/users/UsersList";
import UserForm from "../components/users/UsersForm";
import Modal from "../components/Modal";
import Button from "../components/Button";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const makeRequest = useAxios();

  const fetchUsers = async () => {
    try {
      const response = await makeRequest(
        "http://localhost:3000/api/users",
        "GET",
        null,
        true
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
      setLoading(false);
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
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setFormData(user);
      setIsEditing(true);
    } else {
      setFormData({ name: "", email: "", password: "", role: "customer" });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === formData._id ? formData : user))
        );
      } else {
        const response = await makeRequest(
          "http://localhost:3000/api/users",
          "POST",
          formData,
          true
        );
        setUsers([...users, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting user:", error);
      setError("Failed to save user");
    }
  };

  return (
    <div className=" bg-black text-neutral-200 min-h-screen">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Button onClick={handleOpenModal} text="Add User" />
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
  );
}
