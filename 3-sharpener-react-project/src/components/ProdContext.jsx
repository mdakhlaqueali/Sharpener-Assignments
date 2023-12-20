import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function ProdContextProvider({ children }) {
  const [medsDet, setMedsDet] = useState([]);
  const [cartArray, setCartArray] = useState([]);

  const storeMedicine = (newMeds) => {
    setMedsDet([...medsDet, newMeds]);
  };
  // console.log("shoe Details in medsDet",medsDet);

  let url = `https://shoppers-4d865-default-rtdb.firebaseio.com/`;
  let name = "firebaseData";

  const postDataToFirebase = async (prod) => {
    try {
      const response = await axios.post(`${url}/${name}.json`, prod);
      console.log("response is ", response);
    } catch (error) {
      console.log("error is ", error);
    }
  };

  const getDataToFirebase = async () => {
    try {
      const response = await axios.get(`${url}/${name}.json`);

      console.log("response in getDataToFirebase is ", response.data); // Access response data using response.data

      if (response.data) {
        // const dataArray = Object.keys(response.data);
        const dataArray = Object.values(response.data);
        console.log("dataArray", dataArray);
        setCartArray(dataArray);
      }
    } catch (error) {
      console.log("error in getDataToFirebase", error);
    }
  };

  const storeProductInCart = (prod) => {
    // console.log("product inside storeProductInCart", prod);
    setCartArray((prevProd) => [...prevProd, prod]);

    postDataToFirebase(prod);
  };
  console.log("CartArray for shoe is ", cartArray);

  useEffect(() => {
    const fun = getDataToFirebase;
    fun();
  }, []);

  const context = {
    medsDet: medsDet,
    setMedsDet: setMedsDet,
    storeMedicineFun: storeMedicine,
    cartArray: cartArray,
    storeProductInCart: storeProductInCart,
  };
  // console.log("value of medsDet inside prodcontex",medsDet);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
