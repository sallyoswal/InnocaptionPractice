import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleEditItem = (id, quantity) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  return (
    <>
      <ProductList onAddToCart={handleAddToCart} />
      <Cart
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onEditItem={handleEditItem}
      />
    </>
  );
};

export default ParentComponent;
