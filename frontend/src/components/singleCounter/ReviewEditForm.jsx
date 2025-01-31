import React from "react";
import InputField from "../inputs/InputField"; // Import your InputField component

export default function ReviewEditForm({
  handleUpdateSubmit,
  handleUpdateChange,
  updatedReviewData,
  setRating, // Adding setRating function as a prop
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
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)} // Set rating when a star is clicked
                className={`text-2xl ${
                  star <= updatedReviewData.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
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
