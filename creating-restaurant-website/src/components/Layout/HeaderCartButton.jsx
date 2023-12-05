import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);
    let quantity = 0;
    cartCtx.items.forEach(item=>{
        quantity=quantity+Number(item.quantity)
    })
    
    // const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
    //     return curNumber+item.amount;
    // },0)

    return(
        <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        {/* <span className={classes.badge}>{numberOfCartItems}</span> */}
        <span className={classes.badge}>{quantity}</span>
    </button>
    )
}
export default HeaderCartButton;