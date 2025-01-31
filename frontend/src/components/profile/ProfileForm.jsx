import React, { useState } from "react";
import InputField from "../inputs/InputField";

const ProfileForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p- shadow-md rounded-md"
    >
      <InputField
        label="Name"
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required={false}
      />
      <InputField
        label="Address"
        type="textarea"
        name="address"
        placeholder="Enter your address"
        value={formData.address}
        onChange={handleChange}
      />
      <InputField
        label="Phone"
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileForm;
