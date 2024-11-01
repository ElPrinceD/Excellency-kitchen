import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const Pizzas = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 4;

  // Helper function to paginate a list of products
  const paginateProducts = (productList) => {
    const visitedPage = pageNumber * productPerPage;
    return productList.slice(visitedPage, visitedPage + productPerPage);
  };

  // Categories and their products
  const categories = ["Salads", "Starters", "Rice Dishes", "Curries", "Desserts"];
  const productsByCategory = categories.map((category) => ({
    category,
    products: products.filter((product) => product.category === category),
  }));

  const pageCount = Math.ceil(products.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All Pizzas">
      <Container>
        {productsByCategory.map(({ category, products }) => (
          <div key={category} className="mb-5">
            <h3 className="category-title mb-4">{category}</h3>
            <Row>
              {paginateProducts(products).map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4 mt-4">
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4 mb-4">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={changePage}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName="paginationBttns"
          />
        </div>
      </Container>
    </Helmet>
  );
};

export default Pizzas;
