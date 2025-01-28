import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMerchants } from "../../slices/merchantsSlice";

export default function AddMerchant({ merchants, addMerchantInCounter }) {
  const dispatch = useDispatch();
  const alreadySelectedMerchants = useSelector(
    (state) => state.merchants.selectedMerchants
  );

  const alreadySelectedIds = alreadySelectedMerchants.map(
    (merchant) => merchant._id
  );

  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedMerchants(alreadySelectedIds);
  }, [alreadySelectedMerchants]);

  const handleMerchantSelection = (merchantId) => {
    const updatedSelectedMerchants = selectedMerchants.includes(merchantId)
      ? selectedMerchants.filter((id) => id !== merchantId)
      : [...selectedMerchants, merchantId];

    setSelectedMerchants(updatedSelectedMerchants);
    dispatch(setSelectedMerchants(updatedSelectedMerchants));
  };

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4 text-center">
        Select Merchants to Add
      </h2>
      <input
        type="text"
        placeholder="Search merchants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredMerchants.map((merchant) => (
          <label
            key={merchant._id}
            className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 border  ${
              selectedMerchants.includes(merchant._id)
                ? "border-blue-600"
                : "border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selectedMerchants.includes(merchant._id)}
              onChange={() => handleMerchantSelection(merchant._id)}
            />
            <span className="font-medium">{merchant.name} </span>
            <span className="italic font-light text-stone-500">
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
