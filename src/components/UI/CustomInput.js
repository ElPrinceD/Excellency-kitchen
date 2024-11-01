import React from "react";
import "../../styles/custom-input.css"; // Ensure this path is correct

const CustomInput = ({ type, placeholder, required, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="custom-input"
    />
  );
};

export default CustomInput;
