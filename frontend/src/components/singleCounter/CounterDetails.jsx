import React from "react";

export default function CounterDetails({ counter }) {
  if (!counter.counter_name) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg flex">
      <div className="flex-shrink-0 w-1/3 mr-6">
        <img
          src={counter.imageUrl}
          alt={counter.counter_name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {counter.counter_name}
        </h1>
        <p className="text-lg text-gray-700 mb-2">{counter.description}</p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Location:</strong> {counter.location}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Operating Hours:</strong> {counter.operating_hours.open} -{" "}
          {counter.operating_hours.close}
        </p>
      </div>
    </div>
  );
}
