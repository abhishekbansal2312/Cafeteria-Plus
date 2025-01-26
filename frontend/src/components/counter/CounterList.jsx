import React from "react";

const CounterList = ({ counters, handleDelete, handleEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {counters.map((counter, index) => (
        <div key={index} className="bg-gray-800 shadow-lg rounded-lg ">
          <img
            src={counter.imageUrl}
            alt={counter.counter_name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {counter.counter_name}
            </h3>
            <p className="text-white text-sm mb-2">{counter.description}</p>
            <p className="text-white text-sm mb-2">
              <strong>Location:</strong> {counter.location}
            </p>
            <p className="text-white text-sm mb-2">
              <strong>Hours:</strong> {counter.operating_hours.open} -{" "}
              {counter.operating_hours.close}
            </p>
            <p className="text-white text-sm mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  counter.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {counter.isActive ? "Active" : "Inactive"}
              </span>
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(counter)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(counter._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterList;
