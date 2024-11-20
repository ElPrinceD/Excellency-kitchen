import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getDishes } from "../api/dishes"; // Fetch dishes without updating reservation
import SelectableProductCard from "../components/UI/product-card/SelectableProductCard";
import salads from "../assets/images/WAQA5665.JPG";
import starters from "../assets/images/WAQA5525.JPG";
import curries from "../assets/images/WAQA5590.JPG";
import rice from "../assets/images/WAQA5557.JPG";
import dessert from "../assets/images/WAQA5515.JPG";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pizzas.css";
import { getAuthToken } from "../utils/auth";
import { useProgress } from "../context/ProgressContext";

const categories = ["Salads", "Starters", "Rice Dishes", "Curries", "Desserts"];
const categoryImages = {
  Salads: salads,
  Starters: starters,
  "Rice Dishes": rice,
  Curries: curries,
  Desserts: dessert,
};

const displayCategoryTitles = {
  "Rice Dishes": "Rice Dishes (Main Course)",
  Curries: "Curries (Main Course)",
};

const baseStepIndex = 5;

const Pizzas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    reservationId,
    limits,
    selectedCuisine,
    selectedSpiceLevel,
    selectedChutneys,
  } = location.state || {};
  const token = getAuthToken();
  const { setCurrentStep } = useProgress();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentCategory = categories[categoryIndex];
  const limit = limits ? limits[currentCategory] : 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getDishes(token);


        setProducts(productData);

        console.log("Dishes: ", products)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsByCategory = products.filter(
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
      navigate("/notes", {
        state: {
          reservationId,
          limits,
          selectedCuisine,
          selectedSpiceLevel,
          selectedChutneys,
          selectedItems,
        },
      });
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
            <h3 className="category-title mb-4">{displayCategoryTitles[currentCategory] || currentCategory}</h3>
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
                <span style={{ color: "red", fontSize: "24px", fontWeight: "bolder" }}>
                  You need to select {remainingCount} more item
                  {remainingCount > 1 ? "s" : ""} before continuing.
                </span>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <Button
                onClick={handleContinue}
                disabled={remainingCount > 0}
                style={{
                  backgroundColor: remainingCount > 0 ? 'gray' : 'green',
                  paddingRight: 50,
                  paddingLeft: 50,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderColor: remainingCount > 0 ? 'gray' : 'green',
                  color: 'white', // Ensure the text is readable
                }}
              >
                {categoryIndex < categories.length - 1 ? "Next Page" : "Next Page"}
              </Button>
            </div>
          </>
        )}
      </Container>
    </Helmet>
  );
};

export default Pizzas;