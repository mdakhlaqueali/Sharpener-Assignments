
import ProductPage from "./ProductPage";
import ShoeAddnPrint from "./shoeAddnPrint";

import { Route, Routes } from "react-router-dom";

import CartComp from "./CartComp";


export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/productpage" element={<ProductPage />} />
      <Route path="/" element={<ShoeAddnPrint />} />
      <Route path="/cart" element={<CartComp />} />
      <Route path="*" element={<ShoeAddnPrint />} />

    </Routes>
  );
}
