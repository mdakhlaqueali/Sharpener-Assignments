import Input from './components/Input';
import Display from './components/Display';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch the data from local storage
    const storedData = localStorage.getItem("productData");

    // Parse the JSON string back to an array or use an empty array if null or undefined
    const parsedData = storedData ? JSON.parse(storedData) : [];

    // Update the state with the parsed data
    setProductData(parsedData);
  }, []);

  const handleProductAddition = (newProduct) => {
    // Update the state with the new product data
    const updatedData = [...productData, { ...newProduct }];
    setProductData(updatedData);

    // Save the updated array back to local storage
    localStorage.setItem("productData", JSON.stringify(updatedData));
  };

  const calculateTotalSellingPrice = () => {
    return productData.reduce((total, product) => total + parseFloat(product.sellingPrice || 0), 0);
  };

  const handleDelete = (index) => {
    // Remove the item from the array
    // const updatedData = [...productData.slice(0, index), ...productData.slice(index + 1)];
    const updatedData = [...productData];
    updatedData.splice(index, 1);
    setProductData(updatedData);

    // Update local storage with the modified array
    localStorage.setItem("productData", JSON.stringify(updatedData));
  };
  return (
    <div className="App">
      <Input onProductAddition={handleProductAddition}/>
      <Display displayData={productData} onDelete={handleDelete}/>
      <h2 style={{marginTop:'40px'}}>
        Total Value Worth of Products: ₹{calculateTotalSellingPrice().toFixed(2)}
      </h2>
    </div>
  );
}

export default App;
