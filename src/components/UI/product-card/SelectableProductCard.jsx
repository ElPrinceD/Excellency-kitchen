import React from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";

const SelectableProductCard = ({ item, onSelect, isSelected }) => {
  const { id, title, image01 } = item;

  return (
    <div
      className={`product__item d-flex flex-column justify-content-between ${isSelected ? "selected" : ""}`}
      onClick={onSelect} // Triggers selection when clicked
      style={{ cursor: "pointer", border: isSelected ? "2px solid #ff6347" : "1px solid #ccc" }}
    >
      <div className="product__content">
        <img className="product__img w-50" src={image01} alt="Pizza" />
        <h5>
        <h3>{title}</h3>
        </h5>
      </div>
    </div>
  );
};

export default SelectableProductCard;
