import React from "react";
import InputField from "../inputs/InputField";

const CATEGORIES = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
  "dessert",
  "drinks",
  "others",
];

const DishForm = ({ formData, handleChange, handleSubmit, onCancel }) => {
  return (
    <form onSubmit={handleSubmit} className="p-6 ">
      <InputField
        label="Dish Name"
        type="text"
        name="name"
        placeholder="Enter dish name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Description"
        type="textarea"
        name="description"
        placeholder="Enter dish description"
        value={formData.description}
        onChange={handleChange}
      />

      <InputField
        label="Price"
        type="number"
        name="price"
        placeholder="Enter price"
        value={formData.price}
        onChange={handleChange}
      />

      <InputField
        label="Image URL"
        type="text"
        name="image"
        placeholder="Enter image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={(e) =>
              handleChange({
                target: { name: "availability", value: e.target.checked },
              })
            }
          />
          <span>Available</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Dish
        </button>
      </div>
    </form>
  );
};

export default DishForm;
