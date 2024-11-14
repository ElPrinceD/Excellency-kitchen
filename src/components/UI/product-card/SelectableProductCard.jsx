import React, { useState } from "react";
import "../../../styles/product-card.css";  // Ensure proper styling
import { Link } from "react-router-dom";

const SelectableProductCard = ({ item, onSelect, isSelected }) => {
  const { id, title, image, ingredients } = item;
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients((prev) => !prev);
  };

  return (
    <div
      className={`product__item d-flex flex-column justify-content-between ${isSelected ? "selected" : ""}`}
      onClick={onSelect} // Triggers selection when clicked
      style={{ cursor: "pointer", border: isSelected ? "2px solid #bf9d54" : "1px solid #ccc" }}
    >
      <div className="product__content">
        <img className="product__img" src={image} alt={title} />
        <h3>{title}</h3>
      </div>

      {/* Button or small box to toggle ingredients */}
      <div className="ingredients-toggle d-flex justify-content-center mt-2">
        <button
          className="btn btn-info"
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            cursor: "pointer",
            border: "1px solid #ccc",
            backgroundColor: "#f8f9fa",
            color: "#555",
          }}
          onClick={toggleIngredients}
        >
          {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
        </button>
      </div>

      {/* Show ingredients when toggle is clicked */}
      {showIngredients && (
        <div className="ingredients-list mt-2">
          <h6>Ingredients:</h6>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

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
