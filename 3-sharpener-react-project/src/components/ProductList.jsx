import { useContext } from "react";
import { AppContext } from "./Context";

const ProductList = () => {
    const {products, addToCart} = useContext(AppContext);
    console.log(products);
    
    return (
      <div>
      <h2>Product Lists</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Quantity (S): {product.quantity.S}</p>
            <p>Quantity (M): {product.quantity.M}</p>
            <p>Quantity (L): {product.quantity.L}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      </div>
    );
  };
export default ProductList;