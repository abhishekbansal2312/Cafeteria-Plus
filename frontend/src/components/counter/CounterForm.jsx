import React from "react";
import InputField from "../inputs/InputField";

const CounterForm = ({ formData, isEditing, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Counter Name"
        type="text"
        name="counter_name"
        value={formData.counter_name || ""}
        onChange={handleChange}
      />

      <InputField
        label="Description"
        type="textarea"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
      />

      <InputField
        label="Location"
        type="text"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
      />

      <InputField
        label="Image URL"
        type="text"
        name="imageUrl"
        value={formData.imageUrl || ""}
        onChange={handleChange}
      />

      <div className="flex space-x-4">
        <InputField
          label="Open Time"
          type="text"
          name="operating_hours.open"
          value={formData.operating_hours?.open || ""}
          onChange={handleChange}
        />

        <InputField
          label="Close Time"
          type="text"
          name="operating_hours.close"
          value={formData.operating_hours?.close || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive || false}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Is Active
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Counter" : "Add Counter"}
        </button>
      </div>
    </form>
  );
};

export default CounterForm;
