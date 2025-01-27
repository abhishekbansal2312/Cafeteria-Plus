import React, { useState } from "react";

export default function AddMerchant({ merchants, addMerchantInCounter }) {
  const [selectedMerchants, setSelectedMerchants] = useState([]);

  const handleMerchantSelection = (merchantId) => {
    setSelectedMerchants((prevSelected) =>
      prevSelected.includes(merchantId)
        ? prevSelected.filter((id) => id !== merchantId)
        : [...prevSelected, merchantId]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {merchants.map((merchant) => (
          <label key={merchant._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={merchant._id}
              checked={selectedMerchants.includes(merchant._id)}
              onChange={() => handleMerchantSelection(merchant._id)}
            />
            <span>{merchant.name}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => addMerchantInCounter(selectedMerchants)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Selected Merchants
        </button>
      </div>
    </div>
  );
}
