import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
import './ExpenseItem.css';

const ExpenseItem = (props) =>{
    const clickHandler = () =>{
        console.log("Clicked!!")
    }
    const deleteHandler=()=>{
        console.log("Deleted");
    }  
      

    return(
        <div className="expense-item">
            <ExpenseDate date={props.date}></ExpenseDate>
            <ExpenseDetails amount={props.amount} title={props.title}></ExpenseDetails>
            <button onClick={clickHandler}>Change Title</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
}

export default ExpenseItem;
