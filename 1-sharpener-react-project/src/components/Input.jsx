import { useState } from "react"
export default function Input({ onProductAddition }) {
    const initialData = { productId: "", sellingPrice: "", productName: "" };
    const [productData, setProductData] = useState(initialData);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Call the parent component function to add the new product
      onProductAddition(productData);
  
      // Reset the form and state
      event.target.reset();
      setProductData(initialData);
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} style={{marginTop:'50px'}}>
        <label>Product ID: </label>
            <input
              type="number"
              name="productId"
              value={productData.productId}
              onChange={handleChange}
            />

            <label>Selling Price: </label>
            <input
              type="number"
              name="sellingPrice"
              value={productData.sellingPrice}
              onChange={handleChange}
            />

            <label>Product Name: </label>
            <input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
            />
          <input type="submit" value="ADD PRODUCT" style={{color:'white',backgroundColor:'green'}} />
        </form>
      </div>
    );
  }