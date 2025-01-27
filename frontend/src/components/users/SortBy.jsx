import React from "react";

export default function SortBy({ fetchUsers, setRole, role }) {
  const handleRoleClick = (selectedRole) => {
    if (role !== selectedRole) {
      setRole(selectedRole);
      fetchUsers(1, selectedRole);
    }
  };

  return (
    <div className="flex space-x-3 p-4">
      {["", "customer", "merchant", "admin"].map((r) => (
        <button
          key={r}
          onClick={() => handleRoleClick(r)}
          className={`px-4 py-2 rounded-lg transition duration-300 border ${
            role === r
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black hover:bg-blue-200"
          }`}
        >
          {r === ""
            ? "All Users"
            : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
        </button>
      ))}
    </div>
  );
}
