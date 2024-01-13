const ExpenseDetails = (props) => {
    const expenseList = props.expenses.map((expense) => {
        return(
            <li key={expense.id}>
                {expense.amount} - {expense.description} - {expense.category}
            </li>
        )
    });

    return(
        <ul>
            {expenseList}
        </ul>
    )
};

export default ExpenseDetails;