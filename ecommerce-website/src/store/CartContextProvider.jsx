import CartContext from "./CartContext";
import { useState, useMemo } from "react";

const CartContextProvider = (props) => {
  const [items, setItems] = useState([]);

  const AddItemsHandler = (item) => {
    const existingIndex = items.findIndex((i) => i.title === item.title);

    if (existingIndex !== -1) {
      // If the item exists, update its quantity
      const updatedItems = [...items];
      // updatedItems[existingIndex].quantity +=1;
      updatedItems[existingIndex].quantity += item.quantity; // Increment the quantity
      setItems(updatedItems);
    } else {
      // If the item doesn't exist, add it to the cart with quantity 1
      // setItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      setItems((prevItems)=>[...prevItems, item])
    }
  };

  const removeItemHandler = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalAmount = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartContext = {
    items: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount(),
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
