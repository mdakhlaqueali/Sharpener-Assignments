import React, {useState, useRef} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) =>{
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    const collegeInputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const enteredCollegeName = collegeInputRef.current.value;

        if(enteredName.trim().length===0 || enteredCollegeName.trim().length===0 ||enteredAge.trim().length===0){
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if(+enteredAge<0){
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (>0)."
            });
            return;
        }
        console.log(enteredName, enteredAge, enteredCollegeName);
        props.onAddUser(enteredName, enteredAge, enteredCollegeName);
        nameInputRef.current.value = " ";
        ageInputRef.current.value = " ";
    };

    const errorHandler = ()=>{
        setError(null);
    };

    return(
        <>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text"
              ref={nameInputRef}
            />
            <label htmlFor="age">Age(Years)</label>
            <input 
              id="age"
              type="number"
              ref={ageInputRef}
            />
            <label htmlFor="collegename">College Name</label>
            <input 
              id="collegename"
              type="text"
              ref={collegeInputRef}
            />
            <Button type="submit">Add User</Button>
        </form>
        </Card>
        </>
    )
};

export default AddUser;