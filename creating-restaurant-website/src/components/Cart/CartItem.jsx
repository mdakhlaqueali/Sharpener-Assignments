import classes from './CartItem.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const CartItem = (props) => {
  let { addItem, removeItem } = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.quantity} {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => removeItem(props.item)}>−</button>
        <button onClick={() => addItem(props.item)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;