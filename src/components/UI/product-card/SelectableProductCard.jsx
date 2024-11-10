import React from "react";
import "../../../styles/product-card.css";  // Ensure proper styling
import { Link } from "react-router-dom";

const SelectableProductCard = ({ item, onSelect, isSelected }) => {
  const { id, title, image01 } = item;

  return (
    <div
      className={`product__item d-flex flex-column justify-content-between ${isSelected ? "selected" : ""}`}
      onClick={onSelect} // Triggers selection when clicked
      style={{ cursor: "pointer", border: isSelected ? "2px solid #bf9d54" : "1px solid #ccc" }}
    >
      <div className="product__content">
        <img className="product__img w-50" src={image01} alt={title} />
        <h3>{title}</h3>
      </div>

      {/* Custom styled checkbox at the bottom of the card */}
      <div className="checkbox-container d-flex justify-content-center mt-2">
        {isSelected && (
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
          />
        )}
      </div>
    </div>
  );
};

export default SelectableProductCard;
