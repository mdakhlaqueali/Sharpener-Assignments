import React, { useState } from "react";
import Modal from "./Modal";
import { Button, Image } from "react-bootstrap";
import classes from './Cart.module.css';
import { useContext } from "react";
import CartContext from "../store/CartContext";

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const cartCtx = useContext(CartContext);

  console.log("cart items:", cartCtx.items);

  const cartElements = [
    {
      title: "Colors",
      price: 100,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ];

  const handleCartIconClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleRemoveItem = (index) => {
    cartCtx.removeItem(index);
  };

  return (
    <>
      {/* Cart Icon */}
      <Button variant="info" onClick={handleCartIconClick}>Open Cart</Button>

      {/* Cart Modal */}
      {showCart && (
        <Modal>
          <div className={classes["cart-container"]}>
            <h2>Your Cart</h2>
            {cartCtx.items.map((item, index) => (
              <div key={index} className={classes["cart-item"]}>
                <Image className="imgclass" src={item.imageUrl} alt={item.title} rounded height="100px" width="100px" />
                <p>{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <Button variant="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={handleCloseCart}>Close Cart</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Cart;
