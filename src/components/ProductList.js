import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './ProductList.css';

const ProductList = ({ onAddToCart, cartItems, onRemoveItem }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then(response => {
      setProducts(response.data.products);
    });
  }, []);

  const isItemInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getProductInCart = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  const sortProducts = (key) => {
    setSortBy(key);
    const sortedProducts = [...products].sort((a, b) => {
      if (key === 'price') {
        return a.price - b.price;
      } else if (key === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    setProducts(sortedProducts);
  };

  const filterProducts = () => {
    return products.filter(product => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.category.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
  
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (hasHalfStar && i === fullStars) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-list-bg">
      <Container className="py-5">
        <h2 className="text-center mb-4 stylish-title">Product List</h2>
        <Row className="mb-3">
          <Col xs={12}>
            <InputGroup>
              <FormControl
                placeholder="Search by name or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort By: {sortBy || 'Select'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortProducts('title')}>Title</Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts('price')}>Price</Dropdown.Item>
                <Dropdown.Item onClick={() => sortProducts('rating')}>Rating</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {filterProducts().map(product => (
            <Col key={product.id} xs={12} md={4} lg={3} className="mb-4">
              <Card className="h-100 product-card shadow-sm">
                <Card.Img variant="top" src={product.thumbnail} className="product-image" />
                <Card.Body>
                  <Card.Title className="mb-2 product-title">{product.title}</Card.Title>
                  <Card.Text className="mb-3 product-description">{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center product-footer">
                  <div>
                    <p className="rating-stars">
                      {renderRatingStars(product.rating)}
                    </p>
                    <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                  </div>
                  <Button
                    className={`product-button ${isItemInCart(product.id) ? 'btn-remove' : 'btn-add'}`}
                    onClick={() => isItemInCart(product.id) ? onRemoveItem(getProductInCart(product.id).id) : onAddToCart(product)}
                  >
                    {isItemInCart(product.id) ? "Remove" : "Add to Cart"}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default ProductList;
