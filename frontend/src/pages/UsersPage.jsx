import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import UsersList from "../components/users/UsersList";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UsersList users={users} handleDelete={handleDelete} />
    </div>
  );
}
