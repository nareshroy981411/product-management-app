import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import SearchBar from "../SearchBar";
import "./ProductList.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const { products } = await productService.searchProducts(
        searchQuery.toLowerCase()
      );
      console.log("App Products", products);
      setProducts(products);
      setTotalPage(Math.ceil(products.length / 6));
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  console.log("totalPage - ", totalPage);
  console.log("currentPage - ", currentPage);

  const startIndex = (currentPage - 1) * 6;
  const endIndex = Math.min(startIndex + 6, products.length);

  const onPageChange = (i) => {
    setCurrentPage(i);
  };

  const DisplayButton = ({ totalPage }) => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            margin: "5px",
            backgroundColor: currentPage === i ? "green" : "",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div
        className="search-container"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 999,
          marginTop: "0px",
        }}
      >
        <button className="back">
          <Link to="/">ToHome</Link>
        </button>
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="productCcontainer" style={{ marginTop: "60px" }}>
        {products.slice(startIndex, endIndex).map((product, i) => (
          <div
            key={product.id}
            className="productCard"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              width="50px"
              height="40px"
            />
            <h3>{startIndex+i+1} {product.title}</h3>
            <p><span>Description</span>{product.description}</p>
            <p><span>Price: </span>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        {products.length > 0 ? (
          totalPage > 0 ? (
            <center>
              <span>Pages</span>
              <div className="pagination-buttons">
                <DisplayButton totalPage={totalPage} />
              </div>
            </center>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default ProductListPage;
