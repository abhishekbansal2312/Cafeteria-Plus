import React from "react";
import InputField from "../inputs/InputField";

export default function ReviewEditForm({
  handleUpdateSubmit,
  handleUpdateChange,
  updatedReviewData,
}) {
  return (
    <div>
      <form onSubmit={handleUpdateSubmit} className="mt-6 space-y-4">
        <InputField
          label="Title"
          type="text"
          name="title"
          value={updatedReviewData.title}
          onChange={handleUpdateChange}
        />
        <InputField
          label="Rating"
          type="number"
          name="rating"
          value={updatedReviewData.rating}
          onChange={handleUpdateChange}
          min="1"
          max="5"
        />
        <InputField
          label="Comment"
          type="textarea"
          name="comment"
          value={updatedReviewData.comment}
          onChange={handleUpdateChange}
        />
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
}
