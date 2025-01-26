import React from "react";

const DishesList = ({ dishes, makeRequest }) => {
  const addToCart = async (dish) => {
    console.log(dish._id);
    const response = await makeRequest(
      `http://localhost:3000/api/cart`,
      "POST",
      { id: dish._id },
      true
    );
    console.log(response);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {dishes.map((dish) => (
        <div
          key={dish._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
            <p className="text-gray-600 text-sm">{dish.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-gray-600 text-sm">
                <p className="text-gray-900 font-bold mt-2">₹{dish.price}</p>
                <p className="text-gray-700 text-sm">
                  Category: {dish.category}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    dish.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {dish.availability ? "Available" : "Out of Stock"}
                </p>
              </div>
              <div>
                <button
                  onClick={() => addToCart(dish)}
                  className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded`}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DishesList;
