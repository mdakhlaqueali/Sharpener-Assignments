import CartContext from "./CartContext";
import { useState } from "react";

const CartContextProvider = (props) => {
  const [items, setItems] = useState([]);

  const AddItemsHandler = (item) => {
    const existingIndex = items.findIndex((i) => i.title === item.title);

    if (existingIndex !== -1) {
      // If the item exists, update its quantity
      const updatedItems = [...items];
      updatedItems[existingIndex].quantity += 1; // Increment the quantity
      setItems(updatedItems);
    } else {
      // If the item doesn't exist, add it to the cart with quantity 1
      setItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemHandler = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const cartContext = {
    items: items,
    addItems: AddItemsHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
