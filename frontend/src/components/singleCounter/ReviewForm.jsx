import React, { useState, useEffect } from "react";
import InputField from "../inputs/InputField";

export default function ReviewForm({
  handleSubmit,
  formData,
  handleChange,
  setRating,
}) {
  const { title, comment, rating } = formData;

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg mt-2 mx-5">
      <div className="flex flex-row gap-10">
        <div className="w-1/3">
          <InputField
            label="Title"
            type="text"
            name="title"
            placeholder="Enter review title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                }}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <InputField
          label="Comment"
          type="textarea"
          name="comment"
          placeholder="Write your review"
          value={comment}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-1/4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
}
