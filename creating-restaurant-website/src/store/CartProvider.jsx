import React, {useState} from "react";
import CartContext from "./cart-context";

const CartProvider = props => {
    const [items, updateItems] = useState([]);

    const addItemToCartHandler = (item) => {
        // updateItems([...items, item]);
    updateItems((previousItems) => {
        let isPresent = false;
        let updatedItems = previousItems.map((prevItem) => {
          if(prevItem.id === item.id){
            prevItem.quantity++;
            isPresent = true;
          }
          return prevItem;
        });
        if(!isPresent){
          // updatedItems.push(item)
          const newItem = { ...item, quantity: 1 };
          updatedItems = [...updatedItems, newItem];
        }
        return updatedItems;
      });
    };
    const removeItemFromCartHandler = (item) => {
        updateItems((previousItems) => {
          let updatedItems = previousItems.map((prevItem) => {
              if (prevItem.id === item.id) {
                  prevItem.quantity--;
              }
              return prevItem;
          });
  
          // Include items where the quantity is not 0
          updatedItems = updatedItems.filter((item) => item.quantity !== 0);
  
          return updatedItems;
      });
    };

    const cartContext = {
        items: items,
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {console.log("inside CartContext.Provider", cartContext)}
        {props.children}
    </CartContext.Provider>
};
export default CartProvider;