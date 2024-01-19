import CartContext from "./CartContext";
import AuthContext from "./auth-context";
import axios from 'axios';
import { useState, useMemo, useContext, useEffect } from "react";

const CartContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const authCtx = useContext(AuthContext);

  function createUsername(email) {
    // Remove everything after '@' (including '@')
    if(email){
      const username = email.split('@')[0];
      return username;
    }
  }

  const AddItemsHandler = async (item) => {
    const existingIndex = items.findIndex((i) => i.title === item.title);

    if (existingIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex].quantity += item.quantity;

      try{
        const localEmail = localStorage.getItem('email');
        const ctxEmail = authCtx.email
        const username = createUsername(ctxEmail)|| createUsername(localEmail)
        const url = `https://ecommerce-ebd97-default-rtdb.firebaseio.com/${username}/${updatedItems[existingIndex].fireBaseId}.json`;
  
        await axios.patch(url, { quantity: updatedItems[existingIndex].quantity })
        setItems(updatedItems);
      }catch(error){
        console.log(error);
      }
    } else {
      const localEmail = localStorage.getItem('email');
      const ctxEmail = authCtx.email;
      const username = createUsername(ctxEmail)|| createUsername(localEmail)
      const url = `https://ecommerce-ebd97-default-rtdb.firebaseio.com/${username}.json`;
      
      try{
        let response = await axios.post(url, item)
        setItems((prevItems)=>[...prevItems, { fireBaseId: response.data.name, ...item }])
      }catch(error){
        console.log(error);
      }
    }

  };

  const removeItemHandler = (id) => {
    const localEmail = localStorage.getItem('email');
    const ctxEmail = authCtx.email;
    const username = createUsername(ctxEmail)|| createUsername(localEmail);
    const url = `https://ecommerce-ebd97-default-rtdb.firebaseio.com/${username}/${id}.json`;

    try{
      axios.delete(url);
      const updatedItems = items.filter((item) => item.fireBaseId !== id);
      setItems(updatedItems);
    }catch(error){
      console.log(error);
    }
  };

  const getData = async () =>{
    console.log("Fetching data for email:", authCtx.email);
    const localEmail = localStorage.getItem('email');
    const ctxEmail = authCtx.email;
    const username = createUsername(ctxEmail)|| createUsername(localEmail);
    const url = `https://ecommerce-ebd97-default-rtdb.firebaseio.com/${username}.json`;
    try{
      const response = await axios.get(url);
      if (response.status !==200) {
        throw new Error("Failed to fetch data");
      }
      const data = response.data;
      if(data){
        const dataArray = Object.keys(data).map((elem) => ({
          fireBaseId: elem,
          ...data[elem],
      }));
      setItems(dataArray);
    }
    else {
      console.log("data in upd data", data);
    }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
    console.log("User email changed:", authCtx.email);
  }, [authCtx.email]);

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
