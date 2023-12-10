// CandyForm.js
import React, { useContext, useState } from 'react';
import { CandyContext } from '../store/CandyContext';

const CandyForm = () => {
  const { addCandy } = useContext(CandyContext);
  const [candy, setCandy] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setCandy({ ...candy, [e.target.name]: e.target.value });
  };


  const containerStyle = {
    width: '50%',
    margin: '50px auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    fontSize: '1.2em',
    marginBottom: '8px',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCandy(candy);
    setCandy({ name: '', description: '', price: '' });
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Candy Name:
          <input
            type="text"
            name="name"
            value={candy.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={candy.description}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={candy.price}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>Add</button>
      </form>
    </div>
  );
};

export default CandyForm;


