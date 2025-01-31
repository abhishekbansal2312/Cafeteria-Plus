import React from "react";

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium ">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
