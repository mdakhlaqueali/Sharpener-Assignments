// CandyList.js
import React, { useContext, useState } from 'react';
import { CandyContext } from '../store/CandyContext';

const CandyList = () => {
  const { candies, addToCart } = useContext(CandyContext);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (candyName, quantity) => {
    setQuantities({ ...quantities, [candyName]: quantity });
  };

  const handleAddToCart = (candy) => {
    addToCart(candy, parseInt(quantities[candy.name]) || 1);
    setQuantities({ ...quantities, [candy.name]: '' }); // Clear the input after adding to cart
  };


  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const liStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '3px 3px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  };

  const inputStyle = {
    padding: '3px',
    width: '50px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
    boxSizing: 'border-box',
  };

  return (
    <ul style={ulStyle}>
      {candies.map((candy) => (
        <li key={candy.name} style={liStyle} >
          {candy.name} - {candy.description} - ${candy.price}
          <input
            style={inputStyle}
            type="number"
            min="1"
            value={quantities[candy.name] || ''}
            onChange={(e) => handleQuantityChange(candy.name, e.target.value)}
          />
          <button onClick={() => handleAddToCart(candy)} style={buttonStyle} >
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CandyList;
