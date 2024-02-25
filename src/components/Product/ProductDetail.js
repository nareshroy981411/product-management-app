import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/productService";
import Carousel from "react-bootstrap/Carousel";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
  console.log("Singlr product - ", product);
  return (
    <div className="product-detail-container">
      {product ? (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {product.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={product.title} />
              <Carousel.Caption>
                <h3>{index+1} {product.title}</h3>
                <p><span>Description :</span>{product.description}</p>
                <p><span>Price: </span>${product.price}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
