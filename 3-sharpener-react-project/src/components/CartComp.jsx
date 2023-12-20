import { useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./cart.css";
import { CartContext } from "./ProdContext";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cartArray} = useContext(CartContext);
  // console.log("medsDat in cartpage",cartArray);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Nav.Link onClick={handleShow} className="cart" as={Link} to="/cart">
        Cart {cartArray.length}
      </Nav.Link>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tshirt Details</Modal.Title>
        </Modal.Header>
        {cartArray &&
          cartArray.map((prod,index) => (
            <div key={index}>
              <Modal.Body>Tshirt :{prod.medicineName}</Modal.Body>
              <Modal.Body>Description:{prod.medicineDescription}</Modal.Body>
              <Modal.Body>Price:{prod.medicinePrice}</Modal.Body>
              <Modal.Body>Size: {prod.size} </Modal.Body>
             
            
              <hr />
            </div>
          ))}
        <Modal.Footer>
          <Modal.Body>Total:${cartArray.reduce(
              (total, item) => total + item.medicinePrice,
              0
            )}
          </Modal.Body>
          <Button variant="primary" onClick={handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
