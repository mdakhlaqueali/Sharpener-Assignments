import React from "react";
const CartContext = React.createContext({
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  addItems: (items) => {},
  removeItem: (index) => {},
});
export default CartContext;