import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import products from "../assets/fake-data/products";
import SelectableProductCard from "../components/UI/product-card/SelectableProductCard";
import Helmet from "../components/Helmet/Helmet";

const categories = ["Salads", "Starters", "Rice Dishes", "Curries", "Desserts"];

const Pizzas = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize navigate
  const { limits, subscriptionType } = location.state || {};  

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const currentCategory = categories[categoryIndex];
  const limit = limits ? limits[currentCategory] : 1;  

  const productsByCategory = products.filter(
    (product) => product.category === currentCategory
  );

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

  return (
    <Helmet title={currentCategory}>
      <Container>
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
        
        {/* Display Continue button to go to the next category or summary page */}
        <div className="d-flex justify-content-end mt-4">
          <Button 
            onClick={handleContinue} 
            disabled={(selectedItems[currentCategory] || []).length < limit}
          >
            {categoryIndex < categories.length - 1 ? "Continue" : "Go to Summary"}
          </Button>
        </div>
      </Container>
    </Helmet>
  );
};

export default Pizzas;
