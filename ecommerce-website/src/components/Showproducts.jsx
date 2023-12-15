import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import CartContext from "../store/CartContext";

const Showproducts = () => {
  const [quantity, setQuantity] = useState(1);
  const cartCtx = useContext(CartContext);

  const productsArr = [
    {
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      title: "Blue Color",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  function addThisItem(item) {
    cartCtx.addItems({...item, quantity: Number(quantity)});
    setQuantity(1);
  }
  return (
    <>
      <h2>Showproducts</h2>
      <Container>
        <Row>
          {productsArr.map((item) => (
            <Col key={item.title}>
              <Card className="mb-3" style={{ width: "16rem", cursor: "pointer" }}>
                  <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <div className="front-each-other">
                        <Card.Text>${item.price}</Card.Text>
                        <input style={{width:"50px"}} type="number" min="1" onChange={(e) => setQuantity(e.target.value)}/>
                        <Button variant="primary" onClick={() => {addThisItem(item, quantity);}}>
                          Add To Cart
                        </Button>
                      </div>
                    </Card.Body>
              </Card>
            </Col>
          ))}
          
        </Row>
      </Container>
    </>
  );
};
export default Showproducts;