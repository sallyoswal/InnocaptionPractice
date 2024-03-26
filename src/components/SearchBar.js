// src/components/SearchBar.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Form inline>
      <Form.Control
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
