import { useContext } from "react";
import { AppContext } from "./Context";

const Cart = () => {
    const {cartItems, removeFromCart} = useContext(AppContext);
    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <p>Price: {item.price}</p>
              <p>Quantity (S): {parseInt(item.quantity.S)}</p>
              <p>Quantity (M): {parseInt(item.quantity.M)}</p>
              <p>Quantity (L): {parseInt(item.quantity.L)}</p>
              <p>Total Quantity: {parseInt(item.quantity.S) + parseInt(item.quantity.M) + parseInt(item.quantity.L)}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default Cart;