import React from "react";

export default function Display({ displayData, onDelete }) {
  const handleDelete = (index) =>{
    onDelete(index);
  }
  const tableStyle = {
    color: 'black',
    backgroundColor: 'white',
    margin:"auto",
    height:'200px',
    width:'60%'
  };
  const tdStyle = {
    border: '1px solid black', padding: '8px'
  }
  const thStyle = {
    border: '1px solid black', padding: '8px', backgroundColor:'black', color:'white'
  }
  return (
    <div>
      <h1>Product List</h1>
      {displayData.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product ID</th>
              <th style={thStyle}>Selling Price</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((el, index) => (
              <tr key={index} style={{border:"2px solid white", borderSpacing:"2px"}}>
                <td style={tdStyle}>{el.productId}</td>
                <td style={tdStyle} >{el.sellingPrice}</td>
                <td style={tdStyle}>{el.productName}</td>
                <td style={tdStyle}>
                  <button style={{backgroundColor:'red', color:'white'}} onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products to display.</p>
      )}
    </div>
  );
}
