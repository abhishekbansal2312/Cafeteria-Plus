import React from "react";
import { FaMapMarkerAlt, FaEdit, FaTrashAlt, FaCircle } from "react-icons/fa"; // Change FaLocationDot to FaMapMarkerAlt

const CounterList = ({ counters, handleDelete, handleEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
      {counters.map((counter, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden "
        >
          <img
            src={counter.imageUrl}
            alt={counter.counter_name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <div className="flex justify-between items-center">
              {" "}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {counter.counter_name}
              </h3>
              <div>
                <p className="text-sm mb-4 flex items-center">
                  <span
                    className={`${
                      counter.isActive ? "text-green-600" : "text-red-600"
                    } font-bold ml-2 flex items-center`}
                  >
                    <FaCircle
                      className={`${
                        counter.isActive ? "text-green-600" : "text-red-600"
                      } mr-2 ${counter.isActive ? "animate-blink" : ""}`}
                    />
                  </span>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{counter.description}</p>

            {/* Location */}
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <span>{counter.location}</span>
            </p>

            {/* Operating Hours */}
            <p className="text-sm text-gray-600 mb-3">
              <strong>Hours:</strong> {counter.operating_hours.open} -{" "}
              {counter.operating_hours.close}
            </p>

            {/* Status with Icon */}

            {/* Display Themes */}
            <p className="text-sm text-gray-600 mb-3">
              <strong>Themes:</strong>{" "}
              <span className="font-semibold text-gray-700">
                {counter.theme.join(", ")}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button onClick={() => handleEdit(counter)} className="">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => handleDelete(counter._id)} className="">
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CounterList;
