import React from "react";
import "../../../styles/product-card.css";

const SubscriptionCard = (props) => {
  const { id, title, image, description } = props.item;
  const { selectedSubscription, onSelect } = props;

  const handleSelect = () => {
    onSelect(id); // Call the onSelect function with the subscription ID
  };

  return (
    <div 
      className={`product__item d-flex flex-column justify-content-between ${selectedSubscription === id ? 'selected' : ''}`}
      onClick={handleSelect} // Make entire card clickable
      style={{ cursor: "pointer" }}
    >
      <div className="product__content">
        <img className="product__img w-50" src={image} alt={title} />
        <h5>{title}</h5>
        <p className="product__description">{description}</p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <button className="addTOCART__btn">
          Select
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
