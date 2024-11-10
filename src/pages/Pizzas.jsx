import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import products from "../assets/fake-data/products";
import SelectableProductCard from "../components/UI/product-card/SelectableProductCard";
import Helmet from "../components/Helmet/Helmet";
import '../styles/pizzas.css'

const categories = ["Salads", "Starters", "Rice Dishes", "Curries", "Desserts"];

const categoryImages = {
  "Salads": "https://img.freepik.com/free-photo/fresh-salad-with-vegetables_1150-22132.jpg",
  "Starters": "https://img.freepik.com/free-photo/appetizers-food-plate_1150-15545.jpg",
  "Rice Dishes": "https://img.freepik.com/free-photo/delicious-indian-rice-dish-biryani_1150-6986.jpg",
  "Curries": "https://img.freepik.com/free-photo/indian-curry-chicken-curry-rice_1150-5263.jpg",
  "Desserts": "https://img.freepik.com/free-photo/delicious-dessert-with-chocolate_1150-1342.jpg"
};

const Pizzas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { limits, subscriptionType } = location.state || {};

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const currentCategory = categories[categoryIndex];
  const limit = limits ? limits[currentCategory] : 1;

  const productsByCategory = products.filter(
    (product) => product.category === currentCategory
  );

  // Scroll to the top whenever the category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryIndex]);

  const paginateProducts = (productList) => {
    const productPerPage = 40;
    return productList.slice(0, productPerPage);
  };

  const handleSelect = (item) => {
    const currentSelection = selectedItems[currentCategory] || [];
    const isSelected = currentSelection.includes(item);

    if (isSelected) {
      setSelectedItems({
        ...selectedItems,
        [currentCategory]: currentSelection.filter((i) => i !== item),
      });
    } else if (currentSelection.length < limit) {
      setSelectedItems({
        ...selectedItems,
        [currentCategory]: [...currentSelection, item],
      });
    }
  };

  const handleContinue = () => {
    if (categoryIndex < categories.length - 1) {
      setCategoryIndex(categoryIndex + 1); // Move to the next category
    } else {
      // Navigate to the summary page after the last category
      navigate("/summary", { state: { selectedItems } });
    }
  };

  const selectedCount = (selectedItems[currentCategory] || []).length;
  const remainingCount = limit - selectedCount;

  return (
    <Helmet title={currentCategory}>
      <Container>
        {/* Category Image */}
        <div className="category-image-container mb-4">
          <img
            src={categoryImages[currentCategory]}
            alt={`${currentCategory} category`}
            className="category-image"
          />
        </div>

        <h3 className="category-title mb-4">{currentCategory}</h3>
        <p>Choose up to {limit} item(s) from {currentCategory}</p>

        <Row>
          {paginateProducts(productsByCategory).map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4 mt-4">
              <SelectableProductCard
                item={item}
                onSelect={() => handleSelect(item)}
                isSelected={(selectedItems[currentCategory] || []).includes(item)}
              />
            </Col>
          ))}
        </Row>

        {/* Display remaining items to be selected */}
        {remainingCount > 0 && (
          <div className="d-flex justify-content-center mb-4">
            <span style={{ color: "red", fontSize: "16px" }}>
              You need to select {remainingCount} more item{remainingCount > 1 ? "s" : ""} before continuing.
            </span>
          </div>
        )}

        {/* Display Continue button to go to the next category or summary page */}
        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={handleContinue}
            disabled={remainingCount > 0} // Disable the button if items are not selected
          >
            {categoryIndex < categories.length - 1 ? "Continue" : "Go to Summary"}
          </Button>
        </div>
      </Container>
    </Helmet>
  );
};

export default Pizzas;
