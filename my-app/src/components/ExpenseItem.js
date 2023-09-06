import ExpenseDate from './ExpenseDate';
import ExpenseDetails from './ExpenseDetails';
import './ExpenseItem.css';

const ExpenseItem = (props) =>{
    
    return(
        <div className="expense-item">
            <ExpenseDate date={props.date}></ExpenseDate>
            <ExpenseDetails amount={props.amount} title={props.title}></ExpenseDetails>
        </div>
    );
}

export default ExpenseItem;