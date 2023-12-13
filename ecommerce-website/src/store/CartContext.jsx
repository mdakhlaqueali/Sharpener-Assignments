import React from "react";
const CartContext = React.createContext({
  items: [],
  addItems: (items) => {},
  removeItem: (index) => {},
});
export default CartContext;