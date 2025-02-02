import React from "react";
import { FaMapMarkerAlt, FaEdit, FaTrashAlt, FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CounterList = ({ counters = [], handleDelete, handleEdit }) => {
  const user = useSelector((state) => state.userDetail.user);

  // const merchantIds = counters
  //   .map((counter) => counter.merchants)
  //   .map((merchants) => merchants.map((merchant) => merchant._id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mx-10 mt-2 ">
      {counters.map((counter, index) => {
        const flatMerchantIds = [].concat(
          ...counter.merchants.map((m) => m._id)
        );

        return (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden border-1"
          >
            <Link to={`/counters/${counter._id}`}>
              <img
                src={counter.imageUrl}
                alt={counter.counter_name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </Link>

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold mb-3">
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
              <p className="text-sm mb-3">{counter.description}</p>

              <p className="text-sm mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{counter.location}</span>
              </p>

              <p className="text-sm mb-3">
                <strong>Hours:</strong> {counter.operating_hours.open} -{" "}
                {counter.operating_hours.close}
              </p>

              <p className="text-sm mb-3">
                <span className="font italic underline text-cyan-600">
                  {counter.theme.join(", ")}
                </span>
              </p>

              <div className="flex justify-between gap-4">
                {user &&
                  (flatMerchantIds.includes(user.id) ||
                    user.role === "admin") && (
                    <button onClick={() => handleEdit(counter)} className="">
                      <FaEdit className="mr-2" />
                    </button>
                  )}

                {user && user.role == "admin" && (
                  <button
                    onClick={() => handleDelete(counter._id)}
                    className=""
                  >
                    <FaTrashAlt className="mr-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CounterList;
