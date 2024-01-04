import axios from "axios";
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  let url = `https://practice-f5ec2-default-rtdb.firebaseio.com`;

  useEffect(() => {
    // Fetch products from the database when the component mounts
    axios.get(`${url}/products.json`)
      .then(response => setProducts(Object.values(response.data)))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch cart items from the database when the component mounts
    axios.get(`${url}/cart.json`)
      .then(response => setCartItems(Object.values(response.data)))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const addProduct = async (product) => {
    try {
      const productResponse = await axios.post(`${url}/products.json`, product);
      // const allProductsResponse = await axios.get(`${url}/products.json`);
      // const allProductsArray = Object.values(allProductsResponse.data);
      setProducts((prevProducts)=>[...prevProducts, productResponse.data]);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const addToCart = async (product) => {
    try {
      // Add the product to the cart in the database
      const response = await axios.post(`${url}/cart.json`, {...product, cartItemID: Date.now() + Math.floor(Math.random() * 1000) }
      // {
      //   product,
      //   productID: product.id,
      //   quantity: 1,
      // }
      );

      setCartItems((prevCartItems) => [...prevCartItems, response.data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItem) => {
    // const updatedCart = cartItems.filter((item) => item !== product);
    // setCartItems(updatedCart);
    try {
      // Remove the item from the cart in the database;
      const cartResponse = await axios.get(`${url}/cart.json`);
      // const randomKey = Object.keys(cartResponse.data)[0];
      
      let randomKey;
      Object.keys(cartResponse.data).some((key) => {
        const cartItemInKey = cartResponse.data[key];
        if (cartItemInKey && cartItemInKey.cartItemID === cartItem.cartItemID) {
          randomKey = key;
          return true; // Stop iterating once the randomKey is found
        }
        return false;
      });


      await axios.delete(`${url}/cart/${randomKey}.json`);
  
      // Update the local state by filtering out the removed item
      const updatedCart = cartItems.filter((item) => item.cartItemID !== cartItem.cartItemID);
      
      // Log for debugging purposes (can be removed in production)
      console.log('Item removed from database:', cartItem);
      console.log('Updated Cart:', updatedCart);
  
      // Update the local state
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // useEffect(() => {
  //   // Update local storage whenever products or cartItems change
  //   localStorage.setItem('products', JSON.stringify(products));
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [products, cartItems]);

  const contextValue = {
    products,
    cartItems,
    addProduct,
    addToCart,
    removeFromCart,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};