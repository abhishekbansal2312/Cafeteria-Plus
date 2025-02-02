import React from "react";

const SelectField = ({ name, value, options, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className=" border rounded ml-2 text-sm h-10 w-32"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
