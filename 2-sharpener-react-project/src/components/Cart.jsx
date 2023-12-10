import React, { useContext, useState } from 'react';
import { CandyContext } from '../store/CandyContext';
import Modal from './Modal';


const Cart = () => {
  const { cart, updateQuantity, removeItemFromCart } = useContext(CandyContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate total quantity and sum of prices in the cart
  const { totalQuantity, totalPrice } = cart.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += parseFloat(item.price) * item.quantity; // Convert to number
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
  
  const inputStyle = {
    padding: '3px',
    width: '50px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
    boxSizing: 'border-box',
  }

  return (
    <div>
      <h2>Cart</h2>
      <button onClick={openModal}>Open Cart ({totalQuantity})</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div >
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity:
                <input
                  style={inputStyle}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                />
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                - Price: ${parseFloat(item.price).toFixed(2)} - Subtotal: ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </div>
          <div>
          <button onClick={closeModal}>Close Cart</button>
          </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Cart;