import { Button, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { CartContext } from "./ProdContext";
import { useContext } from "react";

export default function ProductPage() {
  const { medsDet, storeProductInCart } =
    useContext(CartContext);
  // console.log("Medsdetails", medsDet);

  // const handleCartButton = (medicine, index) => {
  //   // console.log(medicine, index);
  //   const productForCart = {
  //     medicineName: medicine.medicineName,
  //     medicineDescription: medicine.medicineDesc,
  //     medicinePrice: Number(medicine.medicinePrice),
  //   };
  //   // console.log("MedicinePrice is Number or not in productPage",typeof(productForCart.medicinePrice));
  //   // storeProductInCart(productForCart);
  //   // console.log(productForCart);
  // };
  const shoeCartButton = (shoe, index, shoeSize) => {
    // console.log(shoe,index,shoeSize);
    console.log("shoe complete", shoe);
    let newArr = [];

    for (let key in shoe) {
      if (shoe[key] == shoeSize) {
        newArr.push(key);
      }
    }
    // console.log("NewArray", newArr);
    // console.log("NewArray", newArr[0]);

    // const shoeCart = {
    //   shoeName:shoe.medicineName,
    //   shoeDesc:shoe.medicineDesc,
    //   shoePrice:Number(shoe.medicinePrice),
    //   sizeName:newArr[0],
    //   sizeVal:shoeSize

    // }
    // console.log("shoeCart",shoeCart);
    // storeProductInCart(shoeCart)
    // update product page

    let sizeSmall = 0;
    let sizeMed = 0;
    let sizeLarge = 0;
    // sizeS
    switch (newArr[0]) {
      case "sizeS":
        // sizeSmall = shoeSize;
        sizeSmall = 'S';
        break;
      case "sizeM":
        sizeMed = 'M';
        break;
      case "sizeL":
        sizeLarge = 'L';
        break;
    }
    const updatedShoeCart = {
      medicineName: shoe.medicineName,
      medicineDesc: shoe.medicineDesc,
      medicinePrice: Number(shoe.medicinePrice),
      size: sizeSmall||sizeMed||sizeLarge
      
    };
    console.log("UpdatedShoeCart", updatedShoeCart);
    storeProductInCart(updatedShoeCart)
  };

  return (
    <Container className="mt-3 p-1">
      <Card>
        {medsDet.length > 0 &&
          medsDet.map((prod, index) => (
            <div key={index}>
              <Card.Header as="h5">Tshirt Name: {prod.medicineName}</Card.Header>
              <Card.Body>
                <Card.Title>Tshirt Description: {prod.medicineDesc}</Card.Title>
                <Card.Text>Tshirt Price:{prod.medicinePrice}</Card.Text>

                <Button
                  variant="success"
                  onClick={() => shoeCartButton(prod, index, prod.sizeL)}
                  className="m-1"
                >
                  Buy Large {prod.sizeL}
                </Button>
                <Button
                  variant="success"
                  onClick={() => shoeCartButton(prod, index, prod.sizeM)}
                  className="m-1"
                >
                  Buy Medium {prod.sizeM}
                </Button>
                <Button
                  variant="success"
                  onClick={() => shoeCartButton(prod, index, prod.sizeS)}
                  className="m-1"
                >
                  Buy Small {prod.sizeS}
                </Button>

                {/* <Button onClick={()=>handleCartButton(prod,index)} variant="primary">
                  Add To Cart
                </Button> */}
              </Card.Body>
            </div>
          ))}
        {/* <Card.Header as="h5">Medicine Name</Card.Header>
        <Card.Body>
          <Card.Title>Medicine Description</Card.Title>
          <Card.Text>Price:$50</Card.Text>
          <Button variant="primary">Add To Cart</Button>
        </Card.Body> */}
      </Card>
    </Container>
  );
}
