import React from "react";
import {Routes, Route} from "react-router-dom";
import './App.css';
import ProductList from "./components/ProductList";
import Form from "./components/Form";
import Cart from "./components/Cart";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/list" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
