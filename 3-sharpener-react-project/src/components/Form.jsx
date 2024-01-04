import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from './Context';

// Form component to capture product details
const Form = () => {
  const { addProduct } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price,
      quantity: {
        S: quantityS,
        M: quantityM,
        L: quantityL,
      },
    };

    addProduct(product);
    console.log(product);

    // Clear the form fields
    setName('');
    setDescription('');
    setPrice('');
    setQuantityS(0);
    setQuantityM(0);
    setQuantityL(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity (S):
        <input type="number" value={quantityS} onChange={(e) => setQuantityS(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity (M):
        <input type="number" value={quantityM} onChange={(e) => setQuantityM(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity (L):
        <input type="number" value={quantityL} onChange={(e) => setQuantityL(e.target.value)} />
      </label>
      <br />
      <button type="submit">ADD</button>
    </form>
  );
};
export default Form;