import React from "react";
import { toast } from "react-hot-toast";
import InputField from "../inputs/InputField";

const UserForm = ({
  formData,
  isEditing,
  handleChange,
  handleSubmit,
  darkMode,
  onClose,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px] ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <InputField
        label="Name"
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
        required={!isEditing}
      />

      <div className="mb-3">
        <label
          className={`block font-semibold mb-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          User Role
        </label>
        <select
          name="role"
          value={formData.role || "student"}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            darkMode
              ? "border-gray-600 text-white bg-gray-800"
              : "border-gray-300"
          }`}
        >
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4 col-span-2">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
