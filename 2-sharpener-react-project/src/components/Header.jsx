import Button from "./Button";
import Input from "./Input";
import classes from "./Header.module.css";

const Header = ()=>{
    return(
        <header className={classes.header}>
            <Input htmlFor="medicine" label="Medicine: " type="text" name="medicine" id="1" ></Input>
            <Input htmlFor="description" label="Description: " type="text" name="description" id="2" ></Input>
            <Input htmlFor="price" label="Price: " type="number" name="price" id="3" ></Input>
            <Button name="ADD PRODUCT"/>
        </header>
    )
}
export default Header;