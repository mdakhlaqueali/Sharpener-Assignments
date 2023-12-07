import React, {useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartcntx = useContext(CartContext);

    const itemsWithTotalCost = cartcntx.items.map((item) => ({
        ...item,
        totalCost: item.price * item.quantity,
    }));

    const overallTotal = itemsWithTotalCost.reduce(
        (total, item) => total + item.totalCost,
        0
    );
    // console.log("overallTotal",overallTotal);

    const totalAmount = overallTotal ? `$${overallTotal.toFixed(2)}` : `$0.00`;
    const hasItems = cartcntx.items.length > 0;
    console.log("Cartcntx.items: ",cartcntx.items);

    const cartItems = (
      <ul className={classes["cart-items"]}>
        {cartcntx.items.map((item)=>(
            <CartItem key={item.id} id={item.id} name={item.name} price={item.price} quantity={item.quantity} amount={item.amount} item={item} ></CartItem>
        ))}
     </ul>
    );
    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};
export default Cart;