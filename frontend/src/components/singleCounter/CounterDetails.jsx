import React from "react";
import { useSelector } from "react-redux";

export default function CounterDetails({ counter }) {
  if (!counter.counter_name) return null;
  console.log(counter);

  const { selectedMerchants } = useSelector((state) => state.merchants);
  console.log(selectedMerchants, "selectedMerchants");

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-lg flex border-2">
      <div className="flex-shrink-0 w-1/3 mr-6">
        <img
          src={counter.imageUrl}
          alt={counter.counter_name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <h1 className="text-3xl font-bold  mb-4">{counter.counter_name}</h1>
        <p className="text-lg mb-2">{counter.description}</p>
        <p className="text-sm  mb-2">
          <strong>Location:</strong> {counter.location}
        </p>
        <p className="text-sm ">
          <strong>Operating Hours:</strong> {counter.operating_hours.open} -{" "}
          {counter.operating_hours.close}
        </p>
        <p className="text-sm flex flex-col mt-2">
          {selectedMerchants.length > 0 && (
            <>
              {selectedMerchants.map((merchant, index) => (
                <span key={index}>
                  {"- "}
                  {merchant.name} ({merchant.email})
                </span>
              ))}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
