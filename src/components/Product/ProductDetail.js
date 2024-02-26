import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/productService";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details: ", error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  console.log("Single product - ", product);

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="detail-card">
          <div className="detail-images">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={product.title} style={{ width: '150px', height: '150px' }} />
            ))}
          </div>
          <div className="details">
            <h3>{product.title}</h3>
            <p><span>Description:</span> {product.description}</p>
            <p><span>Price:</span> ${product.price}</p>
          </div>
          <div className="back-button">
        <button><Link to="/ProductList">Back</Link></button>
      </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
