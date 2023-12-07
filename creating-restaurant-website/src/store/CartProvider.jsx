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
          updatedItems.push(item)
        }
        return updatedItems;
      });
    };
    const removeItemFromCartHandler = (item) => {
        updateItems((previousItems)=>{
            let filterItems = previousItems.filter((prevItem)=>{
              if(prevItem.id === item.id){
                 prevItem.quantity--;
              }
              if(prevItem.quantity!==0){
                return prevItem;
              }
              
            })
            return filterItems;
          })
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