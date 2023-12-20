import { Form, Button } from "react-bootstrap";
import "./shoeAddnPrint.css";
import { useContext, useState } from "react";
import { CartContext } from "./ProdContext";



export default function ShoeAddnPrint() {

  const {storeMedicineFun} = useContext(CartContext)

  const [prod,setProd] = useState({
    medName:'',
    medDes:'',
    medPrice:'',
    L:0,
    M:0,
    S:0

  })
  const changeHandler = (e) =>{
    const {name,value} = e.target;
    setProd(prevProd=>({
      ...prevProd,[name]:value
    }))
  }
  // console.log("Prod value",prod);

  const submitHadler = (e)=>{
    e.preventDefault()
    const value = {
      medicineName:prod.medName,
      medicineDesc:prod.medDes,
      medicinePrice:Number(prod.medPrice),
      sizeL:Number(prod.L),
      sizeM:Number(prod.M),
      sizeS:Number(prod.S)
    }
    
    storeMedicineFun(value)
  }


  return (
    <Form className="setForm" onSubmit={submitHadler} >
      <Form.Group>
        <Form.Label>Tshirt Name</Form.Label>
        <Form.Control name="medName" value={prod.medName} onChange={changeHandler}  placeholder="Enter Tshirt Name" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control name="medDes" value={prod.medDes} onChange={changeHandler} placeholder="Enter Shirt Description" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="Number" name="medPrice" value={prod.medPrice} onChange={changeHandler} placeholder="Price" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="Number" name="L" value={prod.L} onChange={changeHandler} placeholder="Large" />
        <Form.Control type="Number" name="M" value={prod.M} onChange={changeHandler} placeholder="Medium" />
        <Form.Control type="Number" name="S" value={prod.S} onChange={changeHandler} placeholder="Small" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}
