import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SelectableProductCard from "../components/UI/product-card/SelectableProductCard";
import salads from "../assets/images/WAQA5665.JPG";
import starters from "../assets/images/WAQA5525.JPG";
import curries from "../assets/images/WAQA5590.JPG";
import rice from "../assets/images/WAQA5557.JPG";
import dessert from "../assets/images/WAQA5515.JPG";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pizzas.css";
import { useProgress } from "../context/ProgressContext";

const categories = ["Salads", "Starters", "Rice Dishes", "Curries", "Desserts"];
const categoryImages = {
  Salads: salads,
  Starters: starters,
  "Rice Dishes": rice,
  Curries: curries,
  Desserts: dessert,
};

// Dummy data to simulate API response
const dummyProducts = [
  { id: 1, name: "Garden Salad", category: "Salads" },
  { id: 2, name: "Caesar Salad", category: "Salads" },
  { id: 3, name: "Spring Rolls", category: "Starters" },
  { id: 4, name: "Chicken Wings", category: "Starters" },
  { id: 5, name: "Fried Rice", category: "Rice Dishes" },
  { id: 6, name: "Pilaf", category: "Rice Dishes" },
  { id: 7, name: "Butter Chicken", category: "Curries" },
  { id: 8, name: "Lamb Curry", category: "Curries" },
  { id: 9, name: "Chocolate Cake", category: "Desserts" },
  { id: 10, name: "Ice Cream", category: "Desserts" },
];

const baseStepIndex = 6;

const Pizzas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { limits, reservationId } = location.state || {};
  const { setCurrentStep } = useProgress();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const currentCategory = categories[categoryIndex];
  const limit = limits ? limits[currentCategory] : 1;

  // Filter products by category
  const productsByCategory = dummyProducts.filter(
    (product) => product.category === currentCategory
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep(baseStepIndex + categoryIndex); // Update progress step
  }, [categoryIndex, setCurrentStep]);

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
      setCategoryIndex(categoryIndex + 1);
    } else {
      navigate("/summary", { state: { selectedItems } });
    }
  };

  const selectedCount = (selectedItems[currentCategory] || []).length;
  const remainingCount = limit - selectedCount;

  return (
    <Helmet title={currentCategory}>
      <Container>
        <div className="category-image-container mb-4">
          <img
            src={categoryImages[currentCategory]}
            alt={`${currentCategory} category`}
            className="category-image"
          />
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <h3 className="category-title mb-4">{currentCategory}</h3>
            <p>
              Choose up to {limit} item(s) from {currentCategory}
            </p>

            <Row>
              {productsByCategory.map((item) => (
                <Col
                  lg="3"
                  md="4"
                  sm="6"
                  xs="6"
                  key={item.id}
                  className="mb-4 mt-4"
                >
                  <SelectableProductCard
                    item={item}
                    onSelect={() => handleSelect(item)}
                    isSelected={(selectedItems[currentCategory] || []).includes(
                      item
                    )}
                  />
                </Col>
              ))}
            </Row>

            {remainingCount > 0 && (
              <div className="d-flex justify-content-center mb-4">
                <span style={{ color: "red", fontSize: "16px" }}>
                  You need to select {remainingCount} more item
                  {remainingCount > 1 ? "s" : ""} before continuing.
                </span>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <Button onClick={handleContinue} disabled={remainingCount > 0}>
                {categoryIndex < categories.length - 1
                  ? "Next Page"
                  : "Go to Summary"}
              </Button>
            </div>
          </>
        )}
      </Container>
    </Helmet>
  );
};

export default Pizzas;
