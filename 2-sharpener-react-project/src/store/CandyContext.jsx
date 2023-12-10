// CandyContext.js
import React, { createContext, useState } from 'react';

const CandyContext = createContext();

const CandyProvider = ({ children }) => {
  const [candies, setCandies] = useState([]);
  const [cart, setCart] = useState([]);

  const addCandy = (candy) => {
    const newCandy = { ...candy, id: Date.now() }; // Assign a unique id
    setCandies([...candies, newCandy]);
  };

  const addToCart = (candy, quantity) => {
    const existingItemIndex = cart.findIndex((item) => item.id === candy.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...candy, quantity }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CandyContext.Provider
      value={{
        candies,
        cart,
        addCandy,
        addToCart,
        updateQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CandyContext.Provider>
  );
};

export { CandyProvider, CandyContext };




