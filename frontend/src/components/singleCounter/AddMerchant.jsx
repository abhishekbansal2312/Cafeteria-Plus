import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AddMerchant({ merchants, addMerchantInCounter }) {
  const alreadySelectedMerchants = useSelector(
    (state) => state.merchants.selectedMerchants
  );

  console.log(alreadySelectedMerchants, "AlreadySelectedMerchants");

  const alreadySelectedIds = alreadySelectedMerchants.map(
    (merchant) => merchant._id
  );

  const [selectedMerchants, setSelectedMerchants] = useState([]);

  useEffect(() => {
    setSelectedMerchants(alreadySelectedIds);
  }, [alreadySelectedMerchants]);

  const handleMerchantSelection = (merchantId) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(merchantId)
        ? prevSelected.filter((id) => id !== merchantId)
        : [...prevSelected, merchantId]
    );
  };

  return (
    <div className="p-6  rounded-lg w-full ">
      <h2 className="text-xl font-bold  mb-4 text-center">
        Select Merchants to Add
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {merchants.map((merchant) => (
          <label
            key={merchant._id}
            className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 border  ${
              selectedMerchants.includes(merchant._id)
                ? " border-blue-600"
                : "  border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selectedMerchants.includes(merchant._id)}
              onChange={() => handleMerchantSelection(merchant._id)}
            />
            <span className="font-medium">{merchant.name} </span>
            <span className="italic font-light from-stone-500">
              {" -"} {merchant.email}
            </span>
          </label>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => addMerchantInCounter(selectedMerchants)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          Add Selected Merchants
        </button>
      </div>
    </div>
  );
}
